import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Pressable,
  Animated,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import BtnPrimary from "@/components/ui/buttons/btn-primary/BtnPrimary";
import { useSlideUp } from "@/hooks/useSlideUp";
import { Priority } from "../store";
import { MAX_TASK_LEN } from "constants/tasks";
import { PrioritySelector } from "./PrioritySelector";

type AddTaskModalProps = {
  showModal: boolean;
  setShowModal: (v: boolean) => void;
  text: string;
  setText: (v: string) => void;
  priority: Priority;
  setPriority: (p: Priority) => void;
  handleAdd: () => void;
};

export const AddTaskModal = ({
  showModal,
  setShowModal,
  text,
  setText,
  priority,
  setPriority,
  handleAdd,
}: AddTaskModalProps) => {
  const { translateY, slideDown } = useSlideUp(showModal);
  const inputRef = useRef<TextInput>(null);
  const [error, setError] = useState(false);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!showModal) return;
    setError(false);
    const t = setTimeout(() => inputRef.current?.focus(), 250);
    return () => clearTimeout(t);
  }, [showModal]);

  const remaining = useMemo(
    () => `${text.length}/${MAX_TASK_LEN}`,
    [text.length]
  );

  const closeWithCleanup = useCallback(() => {
    setText("");
    setPriority("medium");
    setError(false);
    Keyboard.dismiss();
    slideDown(() => setShowModal(false));
  }, [setPriority, setShowModal, setText, slideDown]);

  const onChangeText = useCallback(
    (v: string) => {
      if (v.length <= MAX_TASK_LEN) setText(v);
      if (error && v.trim() !== "") setError(false);
    },
    [error, setText]
  );

  const onSubmit = useCallback(() => {
    const value = text.trim();
    if (!value) {
      setError(true);
      return;
    }
    setError(false);
    handleAdd();
  }, [handleAdd, text]);

  return (
    <Modal
      visible={showModal}
      animationType="fade"
      transparent
      onRequestClose={closeWithCleanup}
    >
      <Pressable
        className="flex-1 bg-black/20"
        onPress={closeWithCleanup}
        accessibilityRole="button"
        accessibilityLabel="Close modal"
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={insets.bottom}
        style={{ position: "absolute", left: 0, right: 0, bottom: 0 }}
      >
        <Animated.View
          style={{ transform: [{ translateY }] }}
          className="bg-white rounded-t-3xl px-6 pt-4 pb-8 shadow-lg"
        >
          <View className="flex-row items-center justify-between mb-2">
            <Text className="text-gray-700 text-lg font-DMsansBold">
              New task
            </Text>

            <TouchableOpacity
              accessibilityRole="button"
              accessibilityLabel="Close"
              onPress={closeWithCleanup}
              className="w-8 h-8 items-center justify-center"
              testID="close-modal"
            >
              <Text className="text-gray-500 text-xl">×</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            ref={inputRef}
            value={text}
            onChangeText={onChangeText}
            placeholder="Add a task…"
            placeholderTextColor={error ? "#DF6E57" : "#6B7280"}
            className={`mt-2 bg-white rounded-2xl px-4 py-3 text-gray-700 border ${
              error ? "border-pink" : "border-border"
            }`}
            returnKeyType="done"
            onSubmitEditing={onSubmit}
            blurOnSubmit={false}
            accessibilityLabel="Task text input"
          />

          <Text className="text-right text-gray-400 text-xs mt-1">
            {remaining}
          </Text>

          <PrioritySelector value={priority} onChange={setPriority} />

          <View className="mt-4">
            <BtnPrimary onPress={onSubmit}>Add</BtnPrimary>
          </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  );
};
