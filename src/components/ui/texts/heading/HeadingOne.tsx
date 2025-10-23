import React from "react";
import { Text } from "react-native";
import type { TextAlign, TextColors } from "@/types/ui/ui.types";

interface HeadingOneProps {
  children: React.ReactNode;
  color?: TextColors;
  textAlign?: TextAlign;
}

export const HeadingOne = ({
  children,
  color = "text-gray-700",
  textAlign = "text-center",
}: HeadingOneProps) => {
  return (
    <Text className={`font-DMsansBold text-3xl ${color} ${textAlign}`}>
      {children}
    </Text>
  );
};
