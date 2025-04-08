import { Router } from "express";
import {
  addCustomer,
  deleteCustomer,
  getCustomers,
  updateCustomer,
} from "../controllers/customerController";

const router = Router(); // Create a router instance instead of an app

// Define routes on the router

//Customers
router.get("/", getCustomers); // GET

router.post("/", addCustomer); // POST

router.put("/:id", updateCustomer); // EDIT

router.delete("/:id", deleteCustomer); // DELETE

export default router; // Export the router as default
