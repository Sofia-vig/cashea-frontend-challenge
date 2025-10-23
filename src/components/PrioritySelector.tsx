import React, { memo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Priority, priorityLabel } from "../store";

type Props = {
  value: Priority;
  onChange: (p: Priority) => void;
};

const chipClasses: Record<Priority, { active: string }> = {
  low: { active: "bg-mint/30 border-mint" },
  medium: { active: "bg-yellow/40 border-yellow" },
  high: { active: "bg-pink/30 border-pink" },
};

export const PrioritySelector = memo(({ value, onChange }: Props) => {
  const all: Priority[] = ["low", "medium", "high"];

  return (
    <View className="flex-row gap-2 mt-3">
      {all.map((p) => {
        const isActive = value === p;
        const cls = `px-3 py-2 rounded-full border ${
          isActive ? chipClasses[p].active : "bg-white border-border"
        }`;
        const textCls = isActive
          ? "text-gray-700 font-DMsansBold"
          : "text-gray-500";

        return (
          <TouchableOpacity
            key={p}
            onPress={() => onChange(p)}
            accessibilityRole="button"
            accessibilityLabel={`Set priority ${priorityLabel[p]}`}
            className={cls}
          >
            <Text className={textCls}>{priorityLabel[p]}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
});
