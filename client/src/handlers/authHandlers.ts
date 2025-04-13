import { CredentialResponse } from "@react-oauth/google";
import axios from "axios";
import Cookies from "js-cookie";
import { NavigateFunction } from "react-router-dom";
import { Admin, GoogleUser } from "../types/types";

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
    const res = await axios.post<{ message: string; user: Admin }>(
      "http://localhost:5001/api/auth/google",
      { token: idToken }
    );

    console.log("API-svar från backend:", res.data);

    const user = res.data.user;

    // Kontrollera om användaren är admin
    if (!user || !user.isAdmin) {
      console.warn("Användaren är inte admin.");
      setShowModal(true); // Visa modalen om användaren inte är admin
      return;
    }

    // Sätt cookies och fortsätt med inloggning
    Cookies.set("token", idToken, {
      expires: 1,
      secure: true,
      sameSite: "strict",
    });

    onLoginSuccess(user); // Passera användaren till login-funktionen
    navigate("/admin"); // Navigera till admin-sidan
  } catch (error) {
    console.error("Fel vid inloggning:", error);
    setShowModal(true); // Visa modalen vid fel
  }
};

export const handleGoogleError = () => {
  console.log("Inloggning misslyckades");
};
