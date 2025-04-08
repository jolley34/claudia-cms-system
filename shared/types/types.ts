// shared/types.ts
export interface Customer {
  id: string;
  customer_name: string;
  contact_name?: string;
  contact_email: string;
  contact_phone: string;
  domain_name?: string;
  status?: "active" | "inactive";
  edr_site_token?: string;
  EDR: boolean;
  VPN: boolean;
  PWM: boolean;
  createdAt: string;
}

export interface Admin {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  sub: string;
}

export interface GoogleUser {
  email: string;
  name: string;
  sub: string;
}

export interface VpnKey {
  id: string;
  vpn_key: string;
  status: "unused" | "taken";
  createdAt: string;
}

export interface ToolUrl {
  id: string;
}

export interface MeilisearchError {
  message: string;
  code: string;
}

export interface ApiResponse {
  message: string;
  admin?: Admin;
}

export interface AddVpnKeysResponse {
  message: string;
  keys: VpnKey[];
  invalidKeys?: string[];
}
