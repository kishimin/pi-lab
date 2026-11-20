import { expect, test } from "../fixtures/test";

test("プライバシーポリシーから Google の説明ページへ移動できる", async ({ page }) => {
  await page.getByRole("link", { name: "プライバシーポリシー" }).click();
  await expect(page.getByRole("heading", { name: "プライバシーポリシー", exact: true })).toBeVisible();

  await page.route("https://support.google.com/analytics/answer/6004245?hl=ja", async (route) => {
    await route.fulfill({ contentType: "text/html", body: "<title>Google Analytics</title>" });
  });
  await page.getByRole("link", { name: "Google の説明を詳しく見る" }).click();
  await expect(page).toHaveURL("https://support.google.com/analytics/answer/6004245?hl=ja");
});

