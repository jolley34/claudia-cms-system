import cookieParser from "cookie-parser";
import express from "express";

import { corsMiddleware, setCOOPHeader } from "./config/cors";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import vpnKeyRoutes from "./routes/vpnKeyRoutes";

const app = express();

// Middleware
app.use(corsMiddleware);
app.use(setCOOPHeader);
app.use(express.json());
app.use(cookieParser());

// Testroute för att verifiera att servern fungerar
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Autentiserings-routes
app.use("/api/auth", authRoutes);

// Kund-routes
app.use("/api/customers", customerRoutes);

// Admin-routes
app.use("/api/admins", adminRoutes);

// VPN-nyckel routes
app.use("/api/vpn_keys", vpnKeyRoutes);

// Starta servern
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
