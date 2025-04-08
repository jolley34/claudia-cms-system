// src/hooks/useAdminManager.ts
import { Admin } from "@shared/types/types";
import { useEffect, useState } from "react";
import {
  fetchAdmins,
  handleDelete,
  handleSubmitAdmin,
} from "../handlers/adminHandlers";

export const useAdminManager = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [filteredAdmins, setFilteredAdmins] = useState<Admin[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    fetchAdmins(setAdmins, setMessage);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = admins.filter(
        (admin) =>
          admin.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          admin.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredAdmins(filtered);
    } else {
      setFilteredAdmins(admins);
    }
  }, [searchQuery, admins]);

  const handleAddAdmin = (e: React.FormEvent) => {
    handleSubmitAdmin(e, name, email, setName, setEmail, setMessage, setAdmins);
  };

  const handleDeleteAdmin = (id: string) => {
    handleDelete(id, setMessage, setAdmins);
  };

  return {
    name,
    setName,
    email,
    setEmail,
    message,
    admins,
    filteredAdmins,
    searchQuery,
    setSearchQuery,
    handleAddAdmin,
    handleDeleteAdmin,
  };
};
