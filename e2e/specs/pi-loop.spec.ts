import test, { expect } from "playwright/test";
import { PiLoopPage } from "../pages/pi-loop-page";

test.describe("割り切れない研究所", async () => {
  test("割り切れない研究所の一覧画面が表示される", async ({ page }) => {
    const piLoopPage = new PiLoopPage(page);

    await piLoopPage.goto();

    await expect(piLoopPage.getPiMessageLink).toBeVisible();
  });
});
