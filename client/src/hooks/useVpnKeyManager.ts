// src/hooks/useVpnKeyManager.ts
import { useEffect, useState } from "react";
import {
  fetchVpnKeys,
  handleDelete,
  handleDrop,
  handleFileUpload,
} from "../handlers/vpnKeyHandlers";
import { VpnKey } from "../types/types";
import { ValidationResult } from "../validation/vpnKeyValidation";

export const useVpnKeyManager = () => {
  const [vpnKeys, setVpnKeys] = useState<VpnKey[]>([]);
  const [filteredVpnKeys, setFilteredVpnKeys] = useState<VpnKey[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [message, setMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [validationResult, setValidationResult] =
    useState<ValidationResult | null>(null);

  useEffect(() => {
    fetchVpnKeys(setVpnKeys, setMessage);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = vpnKeys.filter((key) =>
        key.vpn_key.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredVpnKeys(filtered);
    } else {
      setFilteredVpnKeys(vpnKeys);
    }
  }, [searchQuery, vpnKeys]);

  const handleAddVpnKeysDrop = (e: React.DragEvent<HTMLDivElement>) => {
    handleDrop(e, setVpnKeys, setMessage, setValidationResult);
    setIsDragging(false);
  };

  const handleAddVpnKeysUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileUpload(e, setVpnKeys, setMessage, setValidationResult);
  };

  const handleDeleteVpnKey = (id: string) => {
    handleDelete(id, setMessage, setVpnKeys);
  };

  return {
    vpnKeys,
    filteredVpnKeys,
    searchQuery,
    setSearchQuery,
    message,
    setMessage,
    isDragging,
    setIsDragging,
    handleAddVpnKeysDrop,
    handleAddVpnKeysUpload,
    handleDeleteVpnKey,
    validationResult,
  };
};
