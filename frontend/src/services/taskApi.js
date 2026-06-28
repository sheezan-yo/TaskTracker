import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api/tasks",
});

export const getTasks = () => API.get("/");
export const getTask = (id) => API.get(`/${id}`);
export const createTask = (task) => API.post("/", task);
export const updateTask = (id, task) => API.put(`/${id}`, task);
export const deleteTask = (id) => API.delete(`/${id}`);