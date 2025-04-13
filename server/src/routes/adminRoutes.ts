import { Router } from "express";
import {
  addAdmin,
  deleteAdmin,
  getAdmins,
} from "../controllers/adminController";

const router = Router();

router.post("/", addAdmin); // POST

router.get("/", getAdmins); // GET

router.delete("/:id", deleteAdmin); // DELETE

export default router;
