import Checkbox from "expo-checkbox";
import React from "react";
import { FlatList, View, Text, TouchableOpacity } from "react-native";
import { Trash2 } from "lucide-react-native";
import { PriorityBadge } from "./PriorityBadge";
import { Priority, Task } from "../store";

type TasksListProps = {
  sorted: Task[];
  toggleTask: (id: string) => void;
  priorityLabel: Record<Priority, string>;
  deleteTask: (id: string) => void;
};

export const TasksList = ({
  sorted,
  toggleTask,
  priorityLabel,
  deleteTask,
}: TasksListProps) => {
  return (
    <FlatList
      data={sorted}
      keyExtractor={(i) => i.id}
      contentContainerStyle={{
        padding: 24,
        paddingTop: 8,
        paddingBottom: 160,
      }}
      ListEmptyComponent={
        <View className="items-center mt-10">
          <Text className="text-gray-500">You haven’t added any tasks yet</Text>
        </View>
      }
      renderItem={({ item }) => (
        <View
          className={`flex-row items-center border border-border rounded-2xl px-4 py-3 mb-3 ${
            item.completed ? "bg-[#ECECEC]" : "bg-card"
          }`}
          style={{
            opacity: item.completed ? 0.8 : 1,
          }}
        >
          <Checkbox
            value={item.completed}
            onValueChange={() => toggleTask(item.id)}
            color={item.completed ? "#A5B4FC" : "#E5E7EB"}
            style={{ width: 22, height: 22, borderRadius: 6 }}
          />

          <View className="flex-1 ml-3 justify-center">
            <Text
              className={`text-lg text-gray-700 ${
                item.completed ? "line-through opacity-60" : ""
              }`}
              style={{ flexShrink: 1 }}
            >
              {item.text}
            </Text>

            <View className="mt-1 self-start">
              <PriorityBadge
                p={item.priority}
                priorityLabel={priorityLabel}
                compact
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => deleteTask(item.id)}
            className="ml-3 p-2 rounded-xl bg-pink/20 items-center justify-center"
          >
            <Trash2 size={16} color="#DF6E57" />
          </TouchableOpacity>
        </View>
      )}
    />
  );
};
