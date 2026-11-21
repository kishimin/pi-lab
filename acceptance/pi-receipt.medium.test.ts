import { expect, test } from "@playwright/test";

test("複数の商品からレシートを作り、共有できない環境でも画像を保存できる", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", { configurable: true, value: undefined });
  });
  await page.goto("/");
  await page.getByRole("link", { name: "πレシート", exact: true }).click();

  await page.getByRole("textbox", { name: "商品名" }).first().fill("コーヒー");
  await page.getByLabel("金額").first().fill("314");
  await page.getByRole("button", { name: "商品を追加" }).click();
  await page.getByRole("textbox", { name: "商品名" }).nth(1).fill("ケーキ");
  await page.getByLabel("金額").nth(1).fill("271");
  await expect(page.getByText("585", { exact: false })).toBeVisible();
  await page.getByRole("button", { name: "レシートを作る" }).click();

  const receipt = page.getByRole("region", { name: "πレシート" });
  await expect(receipt.getByText("コーヒー", { exact: true })).toBeVisible();
  await expect(receipt.getByText("ケーキ", { exact: true })).toBeVisible();
  await expect(receipt.getByText("合計", { exact: true })).toBeVisible();
  await expect(receipt.getByText("3.14%", { exact: false })).toBeVisible();
  await expect(receipt.getByText("πポイント", { exact: true })).toBeVisible();
  await expect(receipt).toContainText("18");

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "画像を保存" }).click();
  const download = await downloadPromise;
  expect(await download.failure()).toBeNull();
  expect(download.suggestedFilename().endsWith(".png")).toBe(true);

  await page.getByRole("button", { name: "再生成" }).click();
  await expect(receipt.getByText("コーヒー", { exact: true })).toBeVisible();
  await expect(receipt.getByText("ケーキ", { exact: true })).toBeVisible();
});

test("不正な金額を入力するとレシートを作れず案内が表示される", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "πレシート", exact: true }).click();
  await page.getByRole("textbox", { name: "商品名" }).first().fill("コーヒー");
  await page.getByLabel("金額").first().fill("-1");
  await page.getByRole("button", { name: "レシートを作る" }).click();
  await expect(page.getByRole("alert")).toBeVisible();
  await expect(page.getByRole("region", { name: "πレシート" })).not.toBeVisible();
});


test("画像共有に対応する環境ではレシート画像を共有できる", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async (data: ShareData) => {
        sessionStorage.setItem("sharedFileType", data.files?.[0]?.type ?? "");
      },
    });
  });
  await page.goto("/");
  await page.getByRole("link", { name: "πレシート", exact: true }).click();
  await page.getByRole("textbox", { name: "商品名" }).first().fill("コーヒー");
  await page.getByLabel("金額").first().fill("314");
  await page.getByRole("button", { name: "レシートを作る" }).click();
  await page.getByRole("button", { name: "画像を共有" }).click();
  await expect.poll(() => page.evaluate(() => sessionStorage.getItem("sharedFileType"))).toBe("image/png");
});

