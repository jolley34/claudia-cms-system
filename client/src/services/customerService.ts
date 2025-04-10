// src/services/customerService.ts
import { Customer } from "../types/types";
import api from "./api";

export const getCustomers = () => api.get<Customer[]>("/customers");

export const addCustomer = (customer: Customer) =>
  api.post("/customers", customer);

export const updateCustomer = (id: string, customer: Partial<Customer>) =>
  api.put(`/customers/${id}`, customer);

export const deleteCustomer = async (id: string) => {
  try {
    await api.delete(`/customers/${id}`);
  } catch (error) {
    console.error("Failed to delete customer:", error);
    throw error;
  }
};
