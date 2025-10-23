import React from "react";
import { Text } from "react-native";
import type { TextAlign, TextColors } from "@/types/ui/ui.types";

interface ParagraphRegularProps {
  children: React.ReactNode;
  color?: TextColors;
  textAlign?: TextAlign;
}

export const ParagraphRegular = ({
  children,
  color = "text-gray-500",
  textAlign = "text-left",
}: ParagraphRegularProps) => {
  return (
    <Text className={`font-DMsansRegular text-base ${color} ${textAlign}`}>
      {children}
    </Text>
  );
};
