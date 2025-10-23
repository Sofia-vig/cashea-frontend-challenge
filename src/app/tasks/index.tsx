import { useEffect, useMemo, useState } from "react";
import { View, Keyboard, Text } from "react-native";
import { SafeAreaLayout } from "@/components/ui/layouts/safe-area/SafeAreaLayout";
import { HeadingOne } from "@/components/ui/texts/heading/HeadingOne";
import { LoadingScreen } from "@/components/ui/loading/LoadingScreen";
import { AddTaskModal } from "@/components/AddTaskModal";
import { TasksList } from "@/components/TasksList";
import { FilterBar } from "@/components/FilterBar";
import { AddButtonOverlay } from "@/components/ui/overlays/AddButtonOverlay";
import {
  useTaskStore,
  type Priority,
  type Status,
  priorityLabel,
} from "@/store/index";
import { useHydrateTasks } from "@/hooks/useHydrateTasks";
import { useTaskActions } from "@/hooks/useTaskActions";
import { computeVisibleTasks } from "@/utils/tasks";
import { CounterBadge } from "@/components/CounterBadge";

export default function TasksScreen() {
  const tasks = useTaskStore((s) => s.tasks);
  const { hydrated, loadError } = useHydrateTasks();
  const { add, toggle, remove } = useTaskActions();
  const pendingCount = useTaskStore(
    (s) => s.tasks.filter((t) => !t.completed).length
  );

  const [showModal, setShowModal] = useState(false);
  const [text, setText] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");
  const [statusFilter, setStatusFilter] = useState<Status>("all");
  const [priorityFilter, setPriorityFilter] = useState<Priority | "all">("all");

  const [showLoading, setShowLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setShowLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const visibleTasks = useMemo(
    () => computeVisibleTasks(tasks, statusFilter, priorityFilter),
    [tasks, statusFilter, priorityFilter]
  );

  const handleAdd = async () => {
    await add(text, priority);
    setStatusFilter("all");
    setPriorityFilter("all");
    setText("");
    setPriority("medium");
    Keyboard.dismiss();
    setShowModal(false);
  };

  const openAddModal = () => {
    setStatusFilter("all");
    setPriorityFilter("all");
    setShowModal(true);
  };

  if (!hydrated || showLoading) return <LoadingScreen />;

  return (
    <SafeAreaLayout>
      <View className="flex-1">
        <View className="px-6 pt-6 pb-2 flex-row items-center justify-between">
          <HeadingOne textAlign="text-left">Tasks</HeadingOne>
          <CounterBadge count={pendingCount} />
        </View>

        {!!loadError && (
          <Text className="text-pink mt-2 px-6">{loadError}</Text>
        )}

        <FilterBar
          status={statusFilter}
          setStatus={setStatusFilter}
          priority={priorityFilter}
          setPriority={setPriorityFilter}
        />

        <TasksList
          sorted={visibleTasks}
          toggleTask={toggle}
          priorityLabel={priorityLabel}
          deleteTask={remove}
        />

        <AddButtonOverlay onPress={openAddModal} position="br" />

        <AddTaskModal
          showModal={showModal}
          setShowModal={setShowModal}
          text={text}
          setText={setText}
          priority={priority}
          setPriority={setPriority}
          handleAdd={handleAdd}
        />
      </View>
    </SafeAreaLayout>
  );
}
