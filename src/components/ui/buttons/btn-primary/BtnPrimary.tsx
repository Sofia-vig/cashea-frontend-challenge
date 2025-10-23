import React from "react";
import { Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { BgColors, TextColors } from "@/types/ui/ui.types";

interface BtnPrimaryProps {
  children: React.ReactNode;
  bgColor?: BgColors;
  textColor?: TextColors;
  onPress?: () => void;
  disabled?: boolean;
  height?: number;
  loading?: boolean;
}

export const BtnPrimary = ({
  children,
  bgColor = "bg-lavender-400",
  textColor = "text-white",
  onPress,
  disabled,
  height,
  loading = false,
}: BtnPrimaryProps) => {
  const style: { height?: number } = {};
  if (height) style.height = height;

  const enabledClasses =
    `${bgColor} active:bg-lavender-500 h-12 px-6 min-w-full rounded-2xl ` +
    `flex justify-center items-center android:elevation-2`;

  const disabledClasses =
    "bg-white border border-border h-12 px-6 min-w-full rounded-2xl " +
    "flex justify-center items-center";

  return (
    <TouchableOpacity
      className={disabled ? disabledClasses : enabledClasses}
      onPress={onPress}
      disabled={disabled || loading}
      style={style}
      accessibilityRole="button"
    >
      {loading ? (
        <ActivityIndicator
          size="small"
          color={disabled ? "#6B7280" : "#FFFFFF"}
        />
      ) : (
        <Text
          className={
            disabled
              ? "text-gray-500 text-[18px] font-DMsansBold"
              : `${textColor} text-[18px] font-DMsansBold`
          }
        >
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default BtnPrimary;
