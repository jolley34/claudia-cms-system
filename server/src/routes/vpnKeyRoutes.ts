// server/routes/vpnKeyRoutes.ts
import { Router } from "express";
import {
  addVpnKeys,
  deleteVpnKey,
  getVpnKeys,
} from "../controllers/vpnKeyController";

const router = Router();

router.post("/", addVpnKeys); // POST för att lägga till VPN-nycklar
router.get("/", getVpnKeys); // GET för att hämta alla VPN-nycklar
router.delete("/:id", deleteVpnKey); // DELETE för att ta bort en nyckel

export default router;
