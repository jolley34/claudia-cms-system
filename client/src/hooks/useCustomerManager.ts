// src/hooks/useCustomerManager.ts
import { Customer } from "@shared/types/types";
import { useEffect, useMemo, useState } from "react";
import {
  fetchCustomers,
  handleAddCustomer,
  handleDeleteCustomer,
  handleUpdateCustomer,
  startEditing,
} from "../handlers/customerHandlers";
import { filterCustomers, sortCustomers } from "../utils/filterUtils";

export const useCustomerManager = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [newCustomer, setNewCustomer] = useState<Customer>({
    id: "",
    customer_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    domain_name: "",
    status: undefined, // Ändrat från "" till undefined
    edr_site_token: "",
    EDR: false,
    VPN: false,
    PWM: false,
    createdAt: "",
  });
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [editValues, setEditValues] = useState<{
    customer_name: string;
    contact_name: string;
    contact_email: string;
    contact_phone: string;
    domain_name: string;
    status: "active" | "inactive" | undefined; // Ändrat till rätt typ
    edr_site_token: string;
    EDR: boolean;
    VPN: boolean;
    PWM: boolean;
  }>({
    customer_name: "",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
    domain_name: "",
    status: undefined, // Ändrat från "" till undefined
    edr_site_token: "",
    EDR: false,
    VPN: false,
    PWM: false,
  });
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState<string>("latest");

  useEffect(() => {
    fetchCustomers(setCustomers);
  }, []);

  const filteredCustomers = useMemo(() => {
    const filtered = filterCustomers(customers, searchQuery);
    return sortCustomers(filtered, sortOption);
  }, [customers, searchQuery, sortOption]);

  const handleDeleteCustomerWithConfirmation = (id: string) => {
    setCustomerToDelete(id);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteCustomer = () => {
    if (customerToDelete) {
      handleDeleteCustomer(customerToDelete, setCustomers, setEditingCustomer);
      setShowDeleteConfirmation(false);
      setCustomerToDelete(null);
    }
  };

  const cancelDeleteCustomer = () => {
    setShowDeleteConfirmation(false);
    setCustomerToDelete(null);
  };

  return {
    customers,
    filteredCustomers,
    newCustomer,
    setNewCustomer,
    editingCustomer,
    setEditingCustomer,
    editValues,
    setEditValues,
    showDeleteConfirmation,
    customerToDelete,
    searchQuery,
    setSearchQuery,
    sortOption,
    setSortOption,
    handleAddCustomer: () =>
      handleAddCustomer(newCustomer, setCustomers, setNewCustomer),
    handleUpdateCustomer: (id: string, values: Partial<Customer>) =>
      handleUpdateCustomer(id, values, setCustomers, setEditingCustomer),
    handleDeleteCustomerWithConfirmation,
    confirmDeleteCustomer,
    cancelDeleteCustomer,
    startEditing: (customer: Customer) =>
      startEditing(customer, setEditingCustomer, setEditValues),
  };
};
