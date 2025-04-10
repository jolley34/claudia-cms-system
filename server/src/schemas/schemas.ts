import { z } from "zod";
import { Admin, Customer, VpnKey } from "../types/types";

// Schema för VPN-nyckel (strängen)
export const vpnKeyStringSchema = z
  .string()
  .regex(
    /^[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}-[a-zA-Z0-9]{5}$/,
    "VPN-nyckeln måste följa formatet XXXXX-XXXXX-XXXXX-XXXXX med alfanumeriska tecken"
  );

// Schema för VpnKey-entitet
export const vpnKeySchema: z.ZodType<VpnKey> = z.object({
  id: z.string(),
  vpn_key: vpnKeyStringSchema,
  status: z.enum(["unused", "taken"]),
  createdAt: z.string().datetime(),
});

// Schema för Admin-entitet
export const adminSchema: z.ZodType<Admin> = z.object({
  id: z.string(),
  name: z.string().min(1, "Namn krävs"),
  email: z.string().email("Ogiltig e-postadress"),
  isAdmin: z.boolean(),
  sub: z.string(),
});

// Schema för Customer-entitet
export const customerSchema: z.ZodType<Customer> = z.object({
  id: z.string(),
  customer_name: z.string().min(1, "Namn krävs"),
  contact_name: z.string().optional().default(""),
  contact_email: z.string().email("Ogiltig e-postadress"),
  contact_phone: z.string().min(1, "Telefonnummer krävs"),
  domain_name: z.string().optional(),
  status: z.enum(["active", "inactive"]).optional(),
  edr_site_token: z.string().optional(),
  EDR: z.boolean(),
  VPN: z.boolean(),
  PWM: z.boolean(),
  createdAt: z.string().datetime(),
});

// Schema för input vid uppladdning av VPN-nycklar
export const vpnKeysInputSchema = z.object({
  keys: z.string().min(1, "Inga nycklar angivna"),
});

// Exportera typer från Zod
export type ZodVpnKey = z.infer<typeof vpnKeySchema>;
export type ZodAdmin = z.infer<typeof adminSchema>;
export type ZodCustomer = z.infer<typeof customerSchema>;
