import { Router } from "express";
import {
  addAdmin,
  deleteAdmin,
  getAdmins,
} from "../controllers/adminController";
import { verifyAdmin } from "../controllers/authController";

const router = Router();

router.post("/", verifyAdmin, addAdmin); // POST

router.get("/", verifyAdmin, getAdmins); // GET

router.delete("/:id", verifyAdmin, deleteAdmin); // DELETE

export default router;
