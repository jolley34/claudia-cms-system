import { v4 as uuidv4 } from "uuid";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../services/customerService";
import { Customer } from "../types/types";

export const fetchCustomers = async (
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>
) => {
  try {
    const response = await getCustomers();
    setCustomers(response.data);
  } catch (error) {
    console.error("Failed to fetch customers:", error);
  }
};

export const handleAddCustomer = async (
  newCustomer: Customer,
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
  setNewCustomer: React.Dispatch<React.SetStateAction<Customer>>
) => {
  const customerWithIdAndDate = {
    ...newCustomer,
    id: uuidv4(),
    createdAt: new Date().toISOString(),
  };

  try {
    await addCustomer(customerWithIdAndDate);
    setCustomers((prevCustomers) => [...prevCustomers, customerWithIdAndDate]);
    setNewCustomer({
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
  } catch (error) {
    console.error("Failed to add customer:", error);
    await fetchCustomers(setCustomers);
  }
};

export const handleUpdateCustomer = async (
  id: string,
  editValues: Partial<Customer>,
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
  setEditingCustomer: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    const response = await updateCustomer(id, editValues);

    setCustomers((prevCustomers) =>
      prevCustomers.map((customer) =>
        customer.id === id
          ? { ...customer, ...editValues, createdAt: customer.createdAt }
          : customer
      )
    );

    setEditingCustomer(null);
  } catch (error) {
    console.error("Failed to update customer:", error);
    await fetchCustomers(setCustomers);
  }
};

export const startEditing = (
  customer: Customer,
  setEditingCustomer: React.Dispatch<React.SetStateAction<string | null>>,
  setEditValues: React.Dispatch<
    React.SetStateAction<{
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
    }>
  >
) => {
  setEditingCustomer(customer.id);
  setEditValues({
    customer_name: customer.customer_name,
    contact_name: customer.contact_name || "",
    contact_email: customer.contact_email,
    contact_phone: customer.contact_phone,
    domain_name: customer.domain_name || "",
    status: customer.status,
    edr_site_token: customer.edr_site_token || "",
    EDR: customer.EDR,
    VPN: customer.VPN,
    PWM: customer.PWM,
  });
};

export const handleDeleteCustomer = async (
  id: string,
  setCustomers: React.Dispatch<React.SetStateAction<Customer[]>>,
  setEditingCustomer: React.Dispatch<React.SetStateAction<string | null>>
) => {
  try {
    await deleteCustomer(id);
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== id)
    );
    setEditingCustomer(null);
  } catch (error) {
    console.error("Failed to delete customer:", error);
  }
};
