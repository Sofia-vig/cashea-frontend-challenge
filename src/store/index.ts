import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type Priority = "low" | "medium" | "high";

export type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  createdAt: number;
};

export const priorityLabel: Record<Priority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export type Status = "all" | "pending" | "completed";

type TaskState = {
  tasks: Task[];

  _hasHydrated: boolean;
  _loadError?: string;

  addTask: (payload: { text: string; priority: Priority }) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  clearAll: () => void;

  _setHydrated: (v: boolean) => void;
  _setLoadError: (msg?: string) => void;
};

export const useTaskStore = create<TaskState>()(
  persist(
    (set, get) => ({
      tasks: [],
      _hasHydrated: false,
      _loadError: undefined,

      addTask: ({ text, priority }) => {
        const value = text.trim();
        if (!value) return;
        const newTask: Task = {
          id: Date.now().toString(),
          text: value,
          completed: false,
          priority,
          createdAt: Date.now(),
        };
        set({ tasks: [newTask, ...get().tasks] });
      },

      toggleTask: (id) => {
        set({
          tasks: get().tasks.map((t) =>
            t.id === id ? { ...t, completed: !t.completed } : t
          ),
        });
      },

      deleteTask: (id) => {
        set({ tasks: get().tasks.filter((t) => t.id !== id) });
      },

      clearAll: () => set({ tasks: [] }),

      _setHydrated: (v) => set({ _hasHydrated: v }),
      _setLoadError: (msg) => set({ _loadError: msg }),
    }),
    {
      name: "tasky.tasks",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ tasks: state.tasks }),
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          state?._setLoadError(
            "We couldn't load your tasks from storage. They will appear unsaved."
          );
        }
        state?._setHydrated(true);
      },
    }
  )
);
