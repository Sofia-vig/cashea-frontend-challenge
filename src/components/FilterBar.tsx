import React from "react";
import { View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import type { Priority } from "@/store/index";

type Status = "all" | "pending" | "completed";

type Props = {
  status: Status;
  setStatus: (s: Status) => void;
  priority: Priority | "all";
  setPriority: (p: Priority | "all") => void;
};

export const FilterBar = ({
  status,
  setStatus,
  priority,
  setPriority,
}: Props) => {
  const statusOptions = [
    { label: "All", value: "all" },
    { label: "Pending", value: "pending" },
    { label: "Completed", value: "completed" },
  ];

  const priorityOptions = [
    { label: "All", value: "all" },
    { label: "Low", value: "low" },
    { label: "Medium", value: "medium" },
    { label: "High", value: "high" },
  ];

  const dropdownBaseStyle = {
    backgroundColor: "#FDF8F4",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    paddingHorizontal: 14,
    paddingVertical: 10,
    minHeight: 50,
  };

  return (
    <View className="flex-row justify-between px-6 mt-3">
      <View className="flex-1 mr-3">
        <Text className="text-gray-500 text-xs mb-1 ml-1">Status</Text>
        <Dropdown
          data={statusOptions}
          value={status}
          labelField="label"
          valueField="value"
          onChange={(item) => setStatus(item.value as Status)}
          style={dropdownBaseStyle}
          placeholderStyle={{ color: "#6B7280", fontSize: 15 }}
          selectedTextStyle={{
            color: "#1E1E2E",
            fontFamily: "DMsansBold",
            fontSize: 15,
          }}
          itemTextStyle={{ color: "#374151", fontSize: 15 }}
          iconColor="#374151"
        />
      </View>

      <View className="flex-1">
        <Text className="text-gray-500 text-xs mb-1 ml-1">Priority</Text>
        <Dropdown
          data={priorityOptions}
          value={priority}
          labelField="label"
          valueField="value"
          onChange={(item) => setPriority(item.value as Priority | "all")}
          style={dropdownBaseStyle}
          placeholderStyle={{ color: "#6B7280", fontSize: 15 }}
          selectedTextStyle={{
            color: "#1E1E2E",
            fontFamily: "DMsansBold",
            fontSize: 15,
          }}
          itemTextStyle={{ color: "#374151", fontSize: 15 }}
          iconColor="#374151"
        />
      </View>
    </View>
  );
};
