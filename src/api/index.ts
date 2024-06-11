// src/api/index.ts
import axios from "axios";
import { User, CreateUserDTO } from "../types/User";

const apiClient = axios.create({
  baseURL: "https://localhost:8443/api",
  headers: {
    "Content-Type": "application/json",
  },
  responseType: "json",
});

apiClient.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient; // Exporting as default

export const login = async (
  username: string,
  password: string
): Promise<string> => {
  const response = await apiClient.post("/users/login", { username, password });
  return response.data;
};

export const getAllUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get("/users/listAll");
    return response.data;
  } catch (error) {
    console.error("Error fetching users from API:", error);
    throw error;
  }
};

export const findUserByEmail = async (email: string): Promise<User> => {
  const response = await apiClient.get("/users/find", { params: { email } });
  return response.data;
};

export const createUser = async (user: CreateUserDTO): Promise<User> => {
  const response = await apiClient.post("/users/register", user);
  return response.data;
};

export const updateUser = async (user: User): Promise<User> => {
  const response = await apiClient.put("/users/update", user);
  return response.data;
};

export const deleteUser = async (userId: number): Promise<void> => {
  await apiClient.delete(`/users/delete/${userId}`);
};

export const fetchPublicKey = async (): Promise<string> => {
  const response = await apiClient.get("/public-key");
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post("/logout");
  sessionStorage.removeItem("token");
};
