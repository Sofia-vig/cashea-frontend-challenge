import { Alert, LayoutAnimation } from "react-native";
import { useTaskStore } from "@/store/index";
import { addTaskApi, toggleTaskApi, deleteTaskApi } from "@/api/index";
import { normalizeTask } from "@/utils/tasks";
import type { Priority, Task } from "@/store/index";

export function useTaskActions() {
  const tasks = useTaskStore((s) => s.tasks);
  const deleteTask = useTaskStore((s) => s.deleteTask);

  const add = async (text: string, priority: Priority) => {
    const value = text.trim();
    if (!value) return;
    try {
      const created = await addTaskApi(value, priority);
      const newTask = normalizeTask(created);
      useTaskStore.setState((prev) => ({
        ...prev,
        tasks: [newTask, ...prev.tasks],
      }));
    } catch {
      Alert.alert("Error", "Couldn't add the task (API).");
    }
  };

  const toggle = async (id: string) => {
    try {
      const target = tasks.find((t) => t.id === id);
      if (!target) return;
      await toggleTaskApi(id, !target.completed);
      LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

      useTaskStore.setState((prev) => {
        const updated = prev.tasks.map((t) =>
          t.id === id ? { ...t, completed: !t.completed } : t
        );
        const pending = updated.filter((t) => !t.completed);
        const done = updated.filter((t) => t.completed);
        return { ...prev, tasks: [...pending, ...done] };
      });
    } catch {
      Alert.alert("Error", "Couldn't toggle the task (API).");
    }
  };

  const remove = async (id: string) => {
    try {
      await deleteTaskApi(id);
      deleteTask(id);
    } catch {
      Alert.alert("Error", "Couldn't delete the task (API).");
    }
  };

  return { add, toggle, remove };
}
export default useTaskActions;
