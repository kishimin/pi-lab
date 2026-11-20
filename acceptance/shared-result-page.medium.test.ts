import { expect, test } from "@playwright/test";

test("共有リンクを開くと専用画面に結果だけがすぐ表示され、別のメッセージを試せる", async ({ browser }) => {
  const sender = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  const page = await sender.newPage();
  await page.goto("/pi-message");
  await page.getByRole("textbox", { name: "メッセージ" }).fill("ありがとう");
  await page.getByRole("button", { name: "πで伝える" }).click();
  const result = page.getByRole("region", { name: "メッセージ結果" });
  const message = await result.getByRole("heading").innerText();
  await result.getByRole("button", { name: "共有リンクをコピー" }).click();
  await expect(page.getByText("リンクをコピーしました")).toBeVisible();
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(new URL(url).pathname).not.toBe(new URL(page.url()).pathname);
  expect(decodeURIComponent(url)).not.toContain("ありがとう");

  const recipient = await browser.newContext();
  const receivedPage = await recipient.newPage();
  await receivedPage.goto(url);
  const received = receivedPage.getByRole("region", { name: "メッセージ結果" });
  expect(await received.isVisible()).toBe(true);
  await expect(received.getByRole("heading")).toHaveText(message);
  await expect(received.getByRole("button", { name: "共有リンクをコピー" })).not.toBeVisible();
  await expect(received.getByRole("button", { name: "共有する" })).not.toBeVisible();
  await expect(received.getByRole("link", { name: "Xで共有" })).not.toBeVisible();
  await expect(received.getByRole("textbox", { name: "共有リンク" })).not.toBeVisible();
  await received.getByRole("button", { name: "別のメッセージを試す" }).click();
  await expect(receivedPage.getByRole("textbox", { name: "メッセージ" })).toHaveValue("");
  await sender.close();
  await recipient.close();
});
