import { expect, test } from "@playwright/test";

test("共有リンクで同じ結果を受け取り、別のメッセージを試せる", async ({ browser }) => {
  const sender = await browser.newContext({ permissions: ["clipboard-read", "clipboard-write"] });
  const page = await sender.newPage();
  await page.goto("/pi-message");
  await page.getByRole("textbox", { name: "メッセージ" }).fill("ありがとう");
  await page.getByRole("button", { name: "πで伝える" }).click();
  const result = page.getByRole("region", { name: "メッセージ結果" });
  const message = await result.getByRole("heading").innerText();
  await result.getByRole("button", { name: "共有リンクをコピー" }).click({ timeout: 5000 });
  await expect(page.getByText("リンクをコピーしました")).toBeVisible();
  const url = await page.evaluate(() => navigator.clipboard.readText());
  expect(decodeURIComponent(url)).not.toContain("ありがとう");
  const recipient = await browser.newContext();
  const receivedPage = await recipient.newPage();
  await receivedPage.goto(url);
  const received = receivedPage.getByRole("region", { name: "メッセージ結果" });
  expect(await received.isVisible()).toBe(true);
  await expect(received.getByRole("heading")).toHaveText(message);
  await received.getByRole("button", { name: "別のメッセージを試す" }).click();
  await expect(receivedPage.getByRole("textbox", { name: "メッセージ" })).toHaveValue("");
  await sender.close();
  await recipient.close();
});
