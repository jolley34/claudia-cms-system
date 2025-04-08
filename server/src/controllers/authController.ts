import { NextFunction, Request, Response } from "express";
import { TokenPayload } from "google-auth-library";
import { isAdminEmail, verifyGoogleToken } from "../config/googleAuth";

export interface AuthRequest extends Request {
  user?: TokenPayload;
}

// Hantera Google-inloggning
export const googleLogin = async (
  req: Request<{}, any, { token: string }>,
  res: Response
): Promise<void> => {
  const { token } = req.body;

  try {
    const payload = await verifyGoogleToken(token);
    if (!payload.email) {
      res.status(401).json({ message: "Ogiltigt token" });
      return;
    }

    const isAdmin = await isAdminEmail(payload.email);
    if (isAdmin) {
      res.status(200).json({
        message: "Inloggning lyckades",
        user: {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          isAdmin: true,
        },
      });
    } else {
      res.status(403).json({ message: "Du har inte admin-åtkomst" });
    }
  } catch (error) {
    res.status(401).json({ message: "Fel vid verifiering", error });
  }
};

// Middleware för att verifiera admin
export const verifyAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.cookies?.token;

  if (!token) {
    res.status(401).json({ message: "Ingen token" });
    return;
  }

  try {
    const payload = await verifyGoogleToken(token);
    if (!payload.email || !(await isAdminEmail(payload.email))) {
      res.status(403).json({ message: "Inte admin" });
      return;
    }

    req.user = payload;
    next();
  } catch (error) {
    res.status(401).json({ message: "Ogiltigt token" });
  }
};
