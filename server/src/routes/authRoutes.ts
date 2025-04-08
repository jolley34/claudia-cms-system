import { Router } from "express";
import { googleLogin } from "../controllers/authController";

const router = Router();

// Google-inloggning
router.post("/google", googleLogin);

// Logout
router.post("/logout", (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  res.status(200).json({ message: "Utloggad" });
});

export default router;
