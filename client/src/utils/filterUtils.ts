// src/utils/filterUtils.ts
import { Customer, VpnKey } from "../../../shared/types/types";

export const filterCustomers = (
  customers: Customer[],
  searchQuery: string
): Customer[] => {
  if (!searchQuery) return customers;
  const lowerQuery = searchQuery.toLowerCase();
  return customers.filter((customer) =>
    [
      customer.customer_name,
      customer.contact_name || "",
      customer.contact_email,
      customer.contact_phone,
      customer.edr_site_token || "",
      customer.domain_name || "",
    ].some((field) => field.toLowerCase().includes(lowerQuery))
  );
};

export const sortCustomers = (
  customers: Customer[],
  sortOption: string
): Customer[] => {
  const sorted = [...customers];
  if (sortOption === "latest") {
    return sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortOption === "oldest") {
    return sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  } else if (sortOption === "a-z") {
    return sorted.sort((a, b) =>
      a.customer_name.localeCompare(b.customer_name, "sv", {
        sensitivity: "base",
      })
    );
  } else if (sortOption === "z-a") {
    return sorted.sort((a, b) =>
      b.customer_name.localeCompare(a.customer_name, "sv", {
        sensitivity: "base",
      })
    );
  }
  return sorted;
};

export const filterVpnKeys = (
  vpnKeys: VpnKey[],
  searchQuery: string,
  statusFilter: "all" | "unused" | "taken" = "all"
): VpnKey[] => {
  let filtered = [...vpnKeys];

  // Apply status filter
  if (statusFilter !== "all") {
    filtered = filtered.filter((key) => key.status === statusFilter);
  }

  // Apply search query filter
  if (searchQuery) {
    const lowerQuery = searchQuery.toLowerCase();
    filtered = filtered.filter((key) =>
      key.vpn_key.toLowerCase().includes(lowerQuery)
    );
  }

  return filtered;
};

export const sortVpnKeys = (
  vpnKeys: VpnKey[],
  sortOption: "latest" | "oldest" = "latest"
): VpnKey[] => {
  const sorted = [...vpnKeys];
  if (sortOption === "latest") {
    return sorted.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  } else if (sortOption === "oldest") {
    return sorted.sort(
      (a, b) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
  }
  return sorted;
};
