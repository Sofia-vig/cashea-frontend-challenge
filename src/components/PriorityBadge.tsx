import { View, Text } from "react-native";
import { Priority } from "../store";

type PriorityBadgeProps = {
  p: Priority;
  priorityLabel: Record<Priority, string>;
  compact?: boolean;
};

export const PriorityBadge = ({
  p,
  priorityLabel,
  compact = false,
}: PriorityBadgeProps) => {
  const cls =
    p === "high"
      ? "bg-pink/20 text-pink"
      : p === "medium"
      ? "bg-yellow/30 text-gray-700"
      : "bg-mint/30 text-gray-700";

  const pad = compact ? "px-1.5 py-0.5" : "px-2 py-0.5";
  const textSize = compact ? "text-[10px]" : "text-xs";

  return (
    <View className={`rounded-full ${pad} ${cls}`}>
      <Text className={textSize}>{priorityLabel[p]}</Text>
    </View>
  );
};
