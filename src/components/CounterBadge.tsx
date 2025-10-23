import { View, Text } from "react-native";

type Props = {
  count: number;
  labelSingular?: string;
  labelPlural?: string;
};

export const CounterBadge = ({
  count,
  labelSingular = "pending task",
  labelPlural = "pending tasks",
}: Props) => {
  const label = count === 1 ? labelSingular : labelPlural;

  return (
    <View
      className="flex-row items-center rounded-full bg-gray-100 border border-border px-3 py-1"
      accessibilityLabel={`${count} ${label}`}
    >
      <View className="w-2 h-2 rounded-full bg-lavender-500 mr-2" />
      <Text className="text-gray-700 font-DMsansBold">{count}</Text>
      <Text className="text-gray-500 ml-1 text-xs">{label}</Text>
    </View>
  );
};
