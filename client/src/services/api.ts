// client/src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "https://claudia-cms-system.onrender.com/api",
  withCredentials: true,
});

export default api;
