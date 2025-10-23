import React from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AddButtonOverlayProps = {
  onPress: () => void;
  position?: "br" | "tr" | "bl" | "tl";
  offset?: number;
  style?: ViewStyle;
  label?: string | React.ReactNode;
};

export const AddButtonOverlay = ({
  onPress,
  position = "br",
  offset = 26,
  style,
  label,
}: AddButtonOverlayProps) => {
  const insets = useSafeAreaInsets();

  const basePos: ViewStyle = { position: "absolute" };
  if (position.includes("b"))
    basePos.bottom = Math.max(offset, insets.bottom + 12);
  if (position.includes("t")) basePos.top = Math.max(offset, insets.top + 12);
  if (position.includes("r")) basePos.right = offset;
  if (position.includes("l")) basePos.left = offset;

  return (
    <View pointerEvents="box-none" style={StyleSheet.absoluteFill}>
      <TouchableOpacity
        onPress={onPress}
        className="w-16 h-16 rounded-full bg-lavender-400 items-center justify-center android:elevation-6"
        style={[basePos, { zIndex: 20 }, style]}
        accessibilityRole="button"
        accessibilityLabel="Add task"
      >
        {typeof label === "string" || !label ? (
          <Text className="text-white text-3xl font-DMsansBold">+</Text>
        ) : (
          label
        )}
      </TouchableOpacity>
    </View>
  );
};
