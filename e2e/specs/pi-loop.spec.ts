import test, { expect } from "playwright/test";
import { PiLoopPage } from "../pages/pi-loop-page";
import { PiMessagePage } from "../pages/pi-message-page";

test.describe("割り切れない研究所", async () => {
  test("割り切れない研究所の一覧画面が表示される", async ({ page }) => {
    const piLoopPage = new PiLoopPage(page);

    await piLoopPage.goto();

    await expect(piLoopPage.getPiMessageLink).toBeVisible();
  });

  test("πで伝えるのリンクをクリックするとπで伝える画面に遷移する", async ({
    page,
  }) => {
    const piLoopPage = new PiLoopPage(page);
    const piMessagePage = new PiMessagePage(page);

    await piLoopPage.goto();

    await piLoopPage.gotoPiMessage();

    await expect(page).toHaveURL("/pi-message");

    await expect(piMessagePage.getPageTitle).toBeVisible();
  });
});
