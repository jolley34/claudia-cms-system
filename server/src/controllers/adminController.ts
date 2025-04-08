import { Request, Response } from "express";
import { Admin } from "../../../shared/types/types";
import meiliClient from "../config/meilisearch";

const adminIndex = meiliClient.index("admins");

// Lägg till en ny admin
export const addAdmin = async (req: Request, res: Response): Promise<void> => {
  const { name, email } = req.body;

  if (!email || !name) {
    res.status(400).json({ message: "Namn och e-post krävs" });
    return;
  }

  const admin: Admin = {
    id: `${Date.now()}`, // Säkerställ att detta är unikt
    name,
    email,
    isAdmin: true,
    sub: "admin",
  };

  try {
    console.log("Lägger till admin i Meilisearch:", admin);
    await adminIndex.addDocuments([admin]);
    res.status(201).json({ message: "Admin skapad", admin });
  } catch (error) {
    console.error("Fel vid skapande av admin:", error);
    res.status(500).json({ message: "Fel vid skapande av admin", error });
  }
};

// Hämta alla admins
export const getAdmins = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await adminIndex.getDocuments();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av admins", error });
  }
};

// Ta bort en admin
export const deleteAdmin = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  console.log("Försöker ta bort admin med ID:", id); // Logga ID:t

  if (!id) {
    res.status(400).json({ message: "Admin-ID krävs" });
    return;
  }

  try {
    const adminToDelete = await adminIndex.getDocument(id); // Kontrollera om admin finns
    console.log("Admin som ska tas bort:", adminToDelete);
    await adminIndex.deleteDocument(id);
    res.status(200).json({ message: "Admin borttagen" });
  } catch (error) {
    console.error("Fel vid borttagning av admin:", error);
    res.status(500).json({ message: "Fel vid borttagning av admin", error });
  }
};
