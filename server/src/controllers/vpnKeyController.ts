// server/controllers/vpnKeyController.ts
import { Request, Response } from "express";
import { z } from "zod";
import meiliClient from "../config/meilisearch";
import {
  vpnKeySchema,
  vpnKeysInputSchema,
  vpnKeyStringSchema,
} from "../schemas/schemas";
import { VpnKey } from "../types/types";

const vpnKeyIndex = meiliClient.index("vpn_keys");

const INDEX_NAME = "vpn_keys";

export const addVpnKeys = async (
  req: Request,
  res: Response
): Promise<void> => {
  // Kontrollera och skapa index om det inte finns
  try {
    const indexes = await meiliClient.getIndexes();
    const indexExists = indexes.results.some(
      (index) => index.uid === INDEX_NAME
    );

    if (!indexExists) {
      console.log(`Skapar Meilisearch-index: ${INDEX_NAME}`);
      await meiliClient.createIndex(INDEX_NAME, { primaryKey: "id" });
      console.log(`Index ${INDEX_NAME} skapat framgångsrikt`);
    }
  } catch (error) {
    console.error("Fel vid kontroll/skapande av index:", error);
    res
      .status(500)
      .json({ message: "Kunde inte skapa Meilisearch-index", error });
    return;
  }

  const vpnKeyIndex = meiliClient.index(INDEX_NAME);

  const inputParseResult = vpnKeysInputSchema.safeParse(req.body);
  if (!inputParseResult.success) {
    res.status(400).json({ message: inputParseResult.error.errors[0].message });
    return;
  }

  const { keys } = inputParseResult.data;

  const keyArray = keys
    .split("\n")
    .map((key: string) => key.trim())
    .filter((key: string) => key !== "");
  const validationResults = keyArray.map((key) => ({
    key,
    result: vpnKeyStringSchema.safeParse(key),
  }));

  const validKeys = validationResults
    .filter((entry) => entry.result.success)
    .map((entry) => entry.result.data as string);
  const invalidKeys = validationResults
    .filter((entry) => !entry.result.success)
    .map((entry) => {
      const result = entry.result as z.SafeParseError<string>;
      return {
        key: entry.key,
        error: result.error.errors[0].message,
      };
    });

  if (validKeys.length === 0) {
    res.status(400).json({
      message: "Inga giltiga VPN-nycklar hittades",
      invalidKeys: invalidKeys.map((ik) => `${ik.key} (${ik.error})`),
    });
    return;
  }

  const existingKeysResult = await vpnKeyIndex.search("", {
    attributesToRetrieve: ["vpn_key"],
  });
  const existingKeys = new Set(
    existingKeysResult.hits.map((hit: any) => hit.vpn_key)
  );

  const uniqueKeys = validKeys.filter((key) => !existingKeys.has(key));
  const duplicateKeys = validKeys
    .filter((key) => existingKeys.has(key))
    .map((key) => ({ key, error: "Nyckeln finns redan" }));

  if (uniqueKeys.length === 0) {
    res.status(400).json({
      message: "Inga nya unika VPN-nycklar hittades",
      invalidKeys: [
        ...invalidKeys.map((ik) => `${ik.key} (${ik.error})`),
        ...duplicateKeys.map((dk) => `${dk.key} (${dk.error})`),
      ],
    });
    return;
  }

  const vpnKeys: VpnKey[] = uniqueKeys.map((key: string) => {
    const vpnKey = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      vpn_key: key,
      status: "unused" as const,
      createdAt: new Date().toISOString(),
    };
    return vpnKeySchema.parse(vpnKey);
  });

  try {
    await vpnKeyIndex.addDocuments(vpnKeys);
    const allInvalid = [
      ...invalidKeys.map((ik) => ({ key: ik.key, error: ik.error })),
      ...duplicateKeys,
    ];
    res.status(201).json({
      message: `Lagt till ${vpnKeys.length} VPN-nycklar`,
      keys: vpnKeys,
      invalidKeys:
        allInvalid.length > 0
          ? allInvalid.map((ik) => `${ik.key} (${ik.error})`)
          : undefined,
    });
  } catch (error) {
    console.error("Fel vid tillägg av VPN-nycklar:", error);
    res.status(500).json({ message: "Fel vid tillägg av VPN-nycklar", error });
  }
};

// Övriga funktioner oförändrade
export const getVpnKeys = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = await vpnKeyIndex.getDocuments();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: "Fel vid hämtning av VPN-nycklar", error });
  }
};

export const deleteVpnKey = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { id } = req.params;
  if (!id) {
    res.status(400).json({ message: "VPN-nyckel ID krävs" });
    return;
  }
  try {
    await vpnKeyIndex.deleteDocument(id);
    res.status(200).json({ message: "VPN-nyckel borttagen" });
  } catch (error) {
    console.error("Fel vid borttagning av VPN-nyckel:", error);
    res
      .status(500)
      .json({ message: "Fel vid borttagning av VPN-nyckel", error });
  }
};
