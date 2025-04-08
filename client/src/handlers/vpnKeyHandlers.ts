// src/handlers/vpnKeyHandlers.ts
import { DragEvent } from "react";
import { VpnKey } from "../../../shared/types/types";
import {
  addVpnKeys,
  deleteVpnKey,
  getVpnKeys,
} from "../services/vpnKeyService";
import {
  validateVpnKeys,
  ValidationResult,
} from "../validation/vpnKeyValidation";

export const fetchVpnKeys = async (
  setVpnKeys: React.Dispatch<React.SetStateAction<VpnKey[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await getVpnKeys();
    setVpnKeys(response.data.results || []);
  } catch (error: any) {
    setMessage(error.response?.data?.message || "Kunde inte hämta VPN-nycklar");
  }
};

export const handleDrop = async (
  e: DragEvent<HTMLDivElement>,
  setVpnKeys: React.Dispatch<React.SetStateAction<VpnKey[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setValidationResult: React.Dispatch<
    React.SetStateAction<ValidationResult | null>
  >
) => {
  e.preventDefault();
  const file = e.dataTransfer.files[0];
  if (file && file.type === "text/plain") {
    const text = await file.text();
    const { validKeys, validationMessages } = validateVpnKeys(text);

    setValidationResult({ validKeys, invalidKeys: [], validationMessages });

    if (validKeys.length === 0) {
      setMessage(
        `Inga giltiga nycklar hittades: ${validationMessages.join(", ")}`
      );
      return;
    }

    try {
      const response = await addVpnKeys(text);
      setVpnKeys((prev) => [...prev, ...response.data.keys]);
      setMessage(
        response.data.invalidKeys
          ? `${
              response.data.message
            }. Server rapporterade ogiltiga nycklar: ${response.data.invalidKeys.join(
              ", "
            )}`
          : response.data.message
      );
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Kunde inte ladda upp nycklar"
      );
    }
  }
};

export const handleFileUpload = async (
  e: React.ChangeEvent<HTMLInputElement>,
  setVpnKeys: React.Dispatch<React.SetStateAction<VpnKey[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setValidationResult: React.Dispatch<
    React.SetStateAction<ValidationResult | null>
  >
) => {
  const file = e.target.files?.[0];
  if (file && file.type === "text/plain") {
    const text = await file.text();
    const { validKeys, validationMessages } = validateVpnKeys(text);

    setValidationResult({ validKeys, invalidKeys: [], validationMessages });

    if (validKeys.length === 0) {
      setMessage(
        `Inga giltiga nycklar hittades: ${validationMessages.join(", ")}`
      );
      return;
    }

    try {
      const response = await addVpnKeys(text);
      setVpnKeys((prev) => [...prev, ...response.data.keys]);
      setMessage(
        response.data.invalidKeys
          ? `${
              response.data.message
            }. Server rapporterade ogiltiga nycklar: ${response.data.invalidKeys.join(
              ", "
            )}`
          : response.data.message
      );
    } catch (error: any) {
      setMessage(
        error.response?.data?.message || "Kunde inte ladda upp nycklar"
      );
    }
  }
};

export const handleDelete = async (
  id: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setVpnKeys: React.Dispatch<React.SetStateAction<VpnKey[]>>
) => {
  try {
    await deleteVpnKey(id);
    setMessage("VPN-nyckel borttagen");
    setVpnKeys((prev) => prev.filter((key) => key.id !== id));
  } catch (error: any) {
    setMessage(
      error.response?.data?.message || "Kunde inte ta bort VPN-nyckel"
    );
  }
};
