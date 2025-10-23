import { useEffect, useRef } from "react";
import {
  Animated,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import BtnPrimary from "./ui/buttons/btn-primary/BtnPrimary";

export const BottomSheet = ({
  text,
  setText,
  priority,
  setPriority,
  handleAdd,
  onClose,
  priorityLabel,
}: any) => {
  const translateY = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    Animated.timing(translateY, {
      toValue: 0,
      duration: 220,
      useNativeDriver: true,
    }).start();
  }, []);

  const closeWithSlide = () => {
    Animated.timing(translateY, {
      toValue: 400,
      duration: 180,
      useNativeDriver: true,
    }).start(onClose);
  };

  return (
    <Animated.View
      style={{ transform: [{ translateY }] }}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl px-6 pt-5 pb-8 shadow-lg"
    >
      <Text className="text-gray-700 text-lg mt-2 font-DMsansBold">
        Nueva tarea
      </Text>

      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Escribí una tarea…"
        placeholderTextColor="#6B7280"
        className="mt-4 bg-white border border-border rounded-2xl px-4 py-3 text-gray-700"
        returnKeyType="done"
        onSubmitEditing={handleAdd}
      />

      <View className="flex-row gap-2 mt-3">
        {(["low", "medium", "high"] as const).map((p) => (
          <TouchableOpacity
            key={p}
            onPress={() => setPriority(p)}
            className={`px-3 py-2 rounded-full border ${
              priority === p
                ? "border-lavender-500 bg-lavender-400/20"
                : "border-border bg-white"
            }`}
          >
            <Text
              className={priority === p ? "text-gray-700" : "text-gray-500"}
            >
              {priorityLabel[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View className="mt-4">
        <BtnPrimary
          onPress={() => {
            handleAdd();
            closeWithSlide();
          }}
        >
          Agregar
        </BtnPrimary>
      </View>
    </Animated.View>
  );
};
