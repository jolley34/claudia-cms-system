// src/services/adminService.ts
import { Admin, ApiResponse } from "../types/types";
import api from "./api";

export const getAdmins = () => api.get<{ results: Admin[] }>("/admins");

export const addAdmin = (name: string, email: string) =>
  api.post<ApiResponse>("/admins", { name, email });

export const deleteAdmin = async (id: string) => {
  try {
    await api.delete(`/admins/${id}`);
  } catch (error) {
    console.error("Failed to delete admin:", error);
    throw error;
  }
};
