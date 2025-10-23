import { useEffect } from "react";
import { useTaskStore, type Task } from "@/store/index";
import { getTasks } from "@/api/index";
import { normalizeTask } from "@/utils/tasks";

export function useHydrateTasks() {
  const setHydrated = useTaskStore((s) => s._setHydrated);
  const setLoadErr = useTaskStore((s) => s._setLoadError);
  const hydrated = useTaskStore((s) => s._hasHydrated);
  const loadError = useTaskStore((s) => s._loadError);

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        const remote = await getTasks();
        const normalized: Task[] = remote.map(normalizeTask);

        if (!mounted) return;

        useTaskStore.setState((prev) => ({
          ...prev,
          tasks: normalized.sort((a, b) => b.createdAt - a.createdAt),
        }));
        setLoadErr(undefined);
      } catch {
        setLoadErr("Couldn't fetch tasks from API.");
      } finally {
        setHydrated(true);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [setHydrated, setLoadErr]);

  return { hydrated, loadError };
}
