// server/routes/vpnKeyRoutes.ts
import { Router } from "express";
import { verifyAdmin } from "../controllers/authController";
import {
  addVpnKeys,
  deleteVpnKey,
  getVpnKeys,
} from "../controllers/vpnKeyController";

const router = Router();

router.post("/", verifyAdmin, addVpnKeys); // POST för att lägga till VPN-nycklar
router.get("/", verifyAdmin, getVpnKeys); // GET för att hämta alla VPN-nycklar
router.delete("/:id", verifyAdmin, deleteVpnKey); // DELETE för att ta bort en nyckel

export default router;
