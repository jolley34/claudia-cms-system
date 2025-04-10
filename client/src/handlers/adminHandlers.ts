// src/handlers/adminHandlers.ts
import { FormEvent } from "react";
import { addAdmin, deleteAdmin, getAdmins } from "../services/adminService";
import { Admin } from "../types/types";

// Hämta alla admins
export const fetchAdmins = async (
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  try {
    const response = await getAdmins();
    console.log("API-svar från /admins:", response.data);
    setAdmins(response.data.results || []);
  } catch (error: any) {
    console.error("Fel vid hämtning av admins:", error.response || error);
    setMessage(error.response?.data?.message || "Kunde inte hämta admins");
  }
};

// Skapa en ny admin
export const handleSubmitAdmin = async (
  e: FormEvent,
  name: string,
  email: string,
  setName: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>
) => {
  e.preventDefault();

  try {
    console.log("Skickar förfrågan till /admins med:", { name, email });
    const response = await addAdmin(name, email);
    console.log("Svar från servern:", response.data);
    setMessage(response.data.message);
    setName("");
    setEmail("");
    if (response.data.admin) {
      setAdmins((prev) => [...prev, response.data.admin!]);
    }
  } catch (error: any) {
    console.error("Fel vid skapande av admin:", error.response || error);
    setMessage(error.response?.data?.message || "Något gick fel");
  }
};

// Ta bort en admin
export const handleDelete = async (
  id: string,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setAdmins: React.Dispatch<React.SetStateAction<Admin[]>>
) => {
  try {
    console.log("Försöker ta bort admin med ID:", id);
    await deleteAdmin(id);
    console.log("Admin borttagen framgångsrikt");
    setMessage("Admin borttagen");
    setAdmins((prev) => prev.filter((admin) => admin.id !== id));
  } catch (error: any) {
    console.error("Fel vid borttagning av admin:", error.response || error);
    setMessage(error.response?.data?.message || "Kunde inte ta bort admin");
  }
};
