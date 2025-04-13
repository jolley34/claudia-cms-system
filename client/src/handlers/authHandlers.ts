import { CredentialResponse } from "@react-oauth/google";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { Admin, GoogleUser } from "../types/types";

import api from "../services/api";

export const handleGoogleSuccess = async (
  credentialResponse: CredentialResponse,
  navigate: NavigateFunction,
  onLoginSuccess: (user: GoogleUser) => void,
  setShowModal: (visible: boolean) => void
) => {
  const idToken = credentialResponse.credential;
  if (!idToken) {
    console.error("Ingen credential mottagen från Google");
    return;
  }

  try {
    const res = await api.post<{ message: string; user: Admin }>(
      "/auth/google",
      { token: idToken }
    );

    console.log("API-svar från backend:", res.data);

    const user = res.data.user;

    if (!user || !user.isAdmin) {
      console.warn("Användaren är inte admin.");
      setShowModal(true);
      return;
    }

    // Sätt cookie med mer flexibla inställningar
    Cookies.set("token", idToken, {
      expires: 1,
      secure: import.meta.env.PROD, // Endast secure i produktion
      sameSite: import.meta.env.PROD ? "lax" : "strict", // Lax i produktion för cross-site
      path: "/",
    });

    onLoginSuccess(user);
    navigate("/admin");
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    setShowModal(true);
  }
};

export const handleGoogleError = () => {
  console.log("Inloggning misslyckades");
};
