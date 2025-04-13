import cors from "cors";

export const corsOptions = {
  origin: ["https://claudia-cms-system.netlify.app", "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

export default cors(corsOptions);
