// client/src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`, // Använd VITE_API_URL
  withCredentials: true,
});

export default api;
