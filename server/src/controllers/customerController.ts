import { Request, Response } from "express";
import meilisearch from "../config/meilisearch";
import { Customer, MeilisearchError } from "../types/types";

// Fix the return type to Promise<void>
export const getCustomers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const index = meilisearch.index("claudia_customers");
    try {
      await index.getStats();
    } catch (error: unknown) {
      if (isMeilisearchError(error) && error.code === "index_not_found") {
        await meilisearch.createIndex("claudia_customers");
        await index.updateSettings({
          searchableAttributes: [
            "customer_name",
            "contact_name",
            "contact_email",
            "contact_phone",
            "domain_name",
            "status",
            "edr_site_token",
          ],
          displayedAttributes: [
            "id",
            "customer_name",
            "contact_name",
            "contact_email",
            "contact_phone",
            "domain_name",
            "status",
            "edr_site_token",
            "EDR",
            "VPN",
            "PWM",
          ],
        });
      } else {
        throw error;
      }
    }
    const response = await index.search("");
    console.log("Hämtade kunder från Meilisearch:", response.hits);
    res.json(response.hits);
  } catch (error: unknown) {
    console.error("Error in getCustomers:", error);
    if (isMeilisearchError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

// Apply similar fixes to other functions
export const addCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const customer: Customer = req.body;
    console.log("Mottagen kund i addCustomer:", customer);

    if (!customer.id) {
      res.status(400).json({ error: "Customer ID is required" });
      return;
    }

    const index = meilisearch.index("claudia_customers");
    const response = await index.addDocuments([customer]);
    await meilisearch.waitForTask(response.taskUid);

    console.log("Meilisearch response för add:", response);
    res.status(201).json(response);
  } catch (error: unknown) {
    console.error("Error in addCustomer:", error);
    if (isMeilisearchError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const updateCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { id } = req.params;
    const customerUpdates: Partial<Customer> = req.body;

    // Hämta befintlig kund från MeiliSearch
    const index = meilisearch.index("claudia_customers");
    const existingCustomer = await index.getDocument<Customer>(id);

    if (!existingCustomer) {
      res.status(404).json({ error: "Customer not found" });
      return;
    }

    // Behåll `createdAt`
    const updatedCustomer = {
      ...existingCustomer,
      ...customerUpdates,
      createdAt: existingCustomer.createdAt,
    };

    const response = await index.updateDocuments([updatedCustomer]);
    await meilisearch.waitForTask(response.taskUid);

    console.log("Meilisearch response för update:", response);
    res.json(response);
  } catch (error: unknown) {
    console.error("Error in updateCustomer:", error);
    if (isMeilisearchError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

export const deleteCustomer = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  try {
    // Försök att ta bort kunden från MeiliSearch
    const index = meilisearch.index("claudia_customers");
    const response = await index.deleteDocuments([id]); // Ta bort dokumentet från MeiliSearch
    await meilisearch.waitForTask(response.taskUid); // Vänta på att borttagningen ska slutföras

    console.log(`Customer with id ${id} deleted from MeiliSearch.`);
    res.json({ message: "Customer deleted successfully" });
  } catch (error: unknown) {
    console.error("Error in deleteCustomer:", error);
    if (isMeilisearchError(error)) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: "An unexpected error occurred" });
    }
  }
};

// Type guard remains the same
function isMeilisearchError(error: unknown): error is MeilisearchError {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    "code" in error
  );
}
