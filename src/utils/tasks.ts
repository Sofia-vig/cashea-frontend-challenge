import { Task, Priority, Status } from "@/store/index";

export const normalizeTask = (task: any): Task => ({
  id: String(task.id),
  text: String(task.text ?? ""),
  completed: Boolean(task.completed),
  priority: (task.priority as Priority) ?? "medium",
  createdAt: Number(task.createdAt) || Date.now(),
});

export const computeVisibleTasks = (
  tasks: Task[],
  status: Status,
  priority: Priority | "all"
): Task[] => {
  const matchStatus = (task: Task) =>
    status === "all"
      ? true
      : status === "pending"
      ? !task.completed
      : task.completed;

  const matchPriority = (task: Task) =>
    priority === "all" ? true : task.priority === priority;

  return tasks
    .filter((t) => matchStatus(t) && matchPriority(t))
    .slice()
    .sort((a, b) => {
      if (a.completed !== b.completed) return a.completed ? 1 : -1;
      return b.createdAt - a.createdAt;
    });
};
