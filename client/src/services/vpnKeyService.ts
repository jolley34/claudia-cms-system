// src/services/vpnKeyService.ts
import { AddVpnKeysResponse, VpnKey } from "../types/types";
import api from "./api";

export const getVpnKeys = () => api.get<{ results: VpnKey[] }>("/vpn_keys");

export const addVpnKeys = (keys: string) =>
  api.post<AddVpnKeysResponse>("/vpn_keys", { keys });

export const deleteVpnKey = async (id: string) => {
  try {
    await api.delete(`/vpn_keys/${id}`);
  } catch (error) {
    console.error("Failed to delete VPN key:", error);
    throw error;
  }
};
