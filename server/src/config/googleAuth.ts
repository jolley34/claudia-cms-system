import "dotenv/config";
import { OAuth2Client, TokenPayload } from "google-auth-library";
import meiliClient from "./meilisearch";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
if (!CLIENT_ID) {
  throw new Error("GOOGLE_CLIENT_ID is not defined in .env");
}

export const GOOGLE_CLIENT_ID: string = CLIENT_ID;
export const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const adminIndex = meiliClient.index("admins");

// Hjälpfunktion för att verifiera admin-email
export const isAdminEmail = async (email: string): Promise<boolean> => {
  try {
    const result = await adminIndex.search(email, { limit: 1 });
    return result.hits.length > 0 && result.hits[0].email === email;
  } catch (error) {
    console.error("Fel vid kontroll av admin i Meilisearch:", error);
    return false;
  }
};

// Funktion för att verifiera token och returnera payload
export const verifyGoogleToken = async (
  token: string
): Promise<TokenPayload> => {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  if (!payload) {
    throw new Error("Ogiltigt token");
  }
  return payload;
};
