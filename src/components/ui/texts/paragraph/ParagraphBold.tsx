import React from "react";
import { Text } from "react-native";
import type { TextAlign, TextColors } from "@/types/ui/ui.types";

interface ParagraphBoldProps {
  children: React.ReactNode;
  color?: TextColors;
  textAlign?: TextAlign;
}

export const ParagraphBold = ({
  children,
  color = "text-gray-700",
  textAlign = "text-left",
}: ParagraphBoldProps) => {
  return (
    <Text className={`font-DMsansBold text-base ${color} ${textAlign}`}>
      {children}
    </Text>
  );
};
