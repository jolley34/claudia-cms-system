import cors from "cors";

export const corsOptions = {
  origin: "http://localhost:3000", // Anpassa efter frontend-url
  credentials: true, // Tillåt cookies och autentisering
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
