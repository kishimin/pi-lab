const results = [
  "3.14まで頑張りましたが、伝わりませんでした",
  "3で伝えるには、雑すぎました",
  "πでは伝わりません",
  "τで伝えるのは良いかも",
  "このメッセージは伝わりません",
  "eでは伝わるのかな？",
] as const;

export const createShareUrl = (baseUrl: string, message: string): string => {
  const index = results.findIndex((result) => result === message);
  if (index < 0) throw new Error("Unknown message result");
  const url = new URL(baseUrl);
  url.search = "";
  url.hash = new URLSearchParams({ result: String(index) }).toString();
  return url.toString();
};

export const readSharedResult = (hash: string): string | null => {
  const value = new URLSearchParams(hash.startsWith("#") ? hash.slice(1) : hash).get("result");
  if (value === null || !/^[0-5]$/.test(value)) return null;
  return results[Number(value)] ?? null;
};
