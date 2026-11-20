import { resultMessages } from "./pi-message";

export const createShareUrl = (baseUrl: string, message: string): string => {
  const index = resultMessages.findIndex((result) => result === message);
  if (index < 0) throw new Error("Unknown message result");
  const url = new URL(baseUrl);
  url.search = "";
  url.hash = new URLSearchParams({ result: String(index) }).toString();
  return url.toString();
};

export const readSharedResult = (hash: string): string | null => {
  const value = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash).get("result");
  if (value === null || !/^[0-5]$/.test(value)) return null;
  return resultMessages[Number(value)] ?? null;
};
