import { createShareUrl, readSharedResult } from "./share-result";

test("共有 URL から結果を復元できる", () => {
  const url = createShareUrl("https://example.com/pi-message", "πでは伝わりません");
  expect(readSharedResult(new URL(url).hash)).toBe("πでは伝わりません");
});

test("不正な共有データは結果として扱わない", () => {
  expect(readSharedResult("#result=unknown")).toBeNull();
});
