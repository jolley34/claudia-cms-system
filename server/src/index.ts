import cookieParser from "cookie-parser";
import express from "express";

import path from "path";
import cors from "./config/cors";
import adminRoutes from "./routes/adminRoutes";
import authRoutes from "./routes/authRoutes";
import customerRoutes from "./routes/customerRoutes";
import vpnKeyRoutes from "./routes/vpnKeyRoutes";

const app = express();

// Middleware
app.use(cors);

app.use(express.json());
app.use(cookieParser());

// Autentiserings-routes
app.use("/api/auth", authRoutes);

// Kund-routes
app.use("/api/customers", customerRoutes);

// Admin-routes
app.use("/api/admins", adminRoutes);

// VPN-nyckel routes
app.use("/api/vpn_keys", vpnKeyRoutes);

// Servera Vite:s byggda filer i produktion
if (process.env.NODE_ENV === "production") {
  const clientDistPath = path.resolve(__dirname, "../../client/dist");
  app.use(express.static(clientDistPath));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(clientDistPath, "index.html"));
  });
}

// Starta servern
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server körs på port ${PORT}`));
