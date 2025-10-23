import React from "react";
import { Text } from "react-native";
import type { TextAlign, TextColors } from "@/types/ui/ui.types";

interface HeadingTwoProps {
  children: React.ReactNode;
  color?: TextColors;
  textAlign?: TextAlign;
}

export const HeadingTwo = ({
  children,
  color = "text-gray-700",
  textAlign = "text-left",
}: HeadingTwoProps) => {
  return (
    <Text className={`font-DMsansBold text-xl ${color} ${textAlign}`}>
      {children}
    </Text>
  );
};
