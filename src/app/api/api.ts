import axios from "axios";

const API = axios.create({
  baseURL: "/api/task",
  headers: { "Content-Type": "application/json" },
});

export const getTasks = async () => {
  const response = await API.get("/");
  return response.data;
};

export const getTaskById = async (id: string) => {
  const response = await API.get(`/${id}`);
  return response.data;
};

export const createTask = async (task: any) => {
  const response = await API.post("/", task);
  return response.data;
};

export const updateTask = async (id: string, task: any) => {
  const response = await API.put(`/${id}`, task);
  return response.data;
};

export const deleteTask = async (id: string) => {
  const response = await API.delete(`/${id}`);
  return response.data;
};
