import test, { expect, type Page, type TestInfo } from "playwright/test";
import { PiLoopPage } from "../pages/pi-loop-page";
import { PiMessagePage } from "../pages/pi-message-page";

const attachReviewScreenshot = async (
  page: Page,
  testInfo: TestInfo,
  name: string,
) => {
  const body = await page.screenshot({ fullPage: true });

  await testInfo.attach(name, { body, contentType: "image/png" });
};

test.describe("割り切れない研究所 VRTレビュー", () => {
  test("一覧からπで伝える結果と再試行までの表示状態を記録する", async ({
    page,
  }, testInfo) => {
    const piLoopPage = new PiLoopPage(page);
    const piMessagePage = new PiMessagePage(page);

    await page.clock.install();
    await piLoopPage.goto();
    await expect(piLoopPage.getPiMessageLink).toBeVisible();
    await attachReviewScreenshot(page, testInfo, "01-pi-loop");

    await piLoopPage.gotoPiMessage();
    await expect(page).toHaveURL("/pi-message");
    await expect(piMessagePage.getPageTitle).toBeVisible();

    await piMessagePage.messageInput.fillMessageInput("割り切れない研究所");
    await expect(piMessagePage.messageInput.getMessageInput).toHaveValue(
      "割り切れない研究所",
    );
    await attachReviewScreenshot(page, testInfo, "02-pi-message-input");

    await page.clock.pauseAt(new Date());
    await piMessagePage.messageInput.submitMessage();
    await expect(
      piMessagePage.progressingMessage.getProgressMessage,
    ).toBeVisible();
    await attachReviewScreenshot(page, testInfo, "03-pi-message-progress");

    await page.clock.fastForward(2_000);
    await expect(piMessagePage.messageResult.getMessageResult).toBeVisible();
    await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
    await attachReviewScreenshot(page, testInfo, "04-pi-message-result");

    await piMessagePage.messageResult.retryMessage();
    await expect(piMessagePage.messageInput.getMessageInput).toBeVisible();
    await expect(piMessagePage.messageInput.getMessageInput).toHaveValue("");
    await attachReviewScreenshot(page, testInfo, "05-pi-message-retry");
  });
});
