// src/validation/vpnKeyValidation.ts
import { z } from "zod";
import { vpnKeyStringSchema } from "../../src/schemas/schemas";

export interface ValidationResult {
  validKeys: string[];
  invalidKeys: string[];
  validationMessages: string[];
}

export const validateVpnKeys = (text: string): ValidationResult => {
  const keys = text
    .split("\n")
    .map((k) => k.trim())
    .filter((k) => k !== "");

  const validationResults = keys.map((key) => ({
    key,
    result: vpnKeyStringSchema.safeParse(key),
  }));

  const validKeys = validationResults
    .filter((entry) => entry.result.success)
    .map((entry) => entry.result.data as string);

  const invalidKeys = validationResults
    .filter((entry) => !entry.result.success)
    .map((entry) => entry.key);

  const validationMessages = validationResults
    .filter((entry) => !entry.result.success)
    .map((entry) => {
      const result = entry.result as z.SafeParseError<string>;
      return `${entry.key} (${result.error.errors[0].message})`;
    });

  return {
    validKeys,
    invalidKeys,
    validationMessages,
  };
};
