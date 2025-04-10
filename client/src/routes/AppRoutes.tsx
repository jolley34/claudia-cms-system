// src/routes/AppRoutes.tsx
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../components/Login";
import { AdminPage } from "../pages/AdminPage";
import { GoogleUser } from "../types/types";

interface AppRoutesProps {
  user: GoogleUser | null;
  onLoginSuccess: (user: GoogleUser) => void;
  onLogout: () => void;
}

export const AppRoutes = ({
  user,
  onLoginSuccess,
  onLogout,
}: AppRoutesProps) => {
  return (
    <Routes>
      <Route
        path="/login"
        element={<Login onLoginSuccess={onLoginSuccess} />}
      />
      <Route
        path="/admin"
        element={
          user ? (
            <AdminPage onLogout={onLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route path="/" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};
