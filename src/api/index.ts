import axios from "axios";
import { Task, Priority } from "@/store/index";

const API_URL = "https://68fa8a6cef8b2e621e804487.mockapi.io/api/tasks/data";

export const getTasks = async (): Promise<Task[]> => {
  const res = await axios.get(API_URL);
  return res.data;
};

export const addTaskApi = async (text: string, priority: Priority) => {
  const res = await axios.post(API_URL, {
    text,
    priority,
    completed: false,
    createdAt: Date.now(),
  });
  return res.data;
};

export const toggleTaskApi = async (id: string, completed: boolean) => {
  const res = await axios.put(`${API_URL}/${id}`, { completed });
  return res.data;
};

export const deleteTaskApi = async (id: string) => {
  await axios.delete(`${API_URL}/${id}`);
  return id;
};

export const updateTaskApi = async (id: string, updatedTask: Task) => {
  const res = await axios.put(`${API_URL}/${id}`, updatedTask);
  return res.data;
};
