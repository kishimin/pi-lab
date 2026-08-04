import test, { expect, type Page, type TestInfo } from "playwright/test";
import { PiMessagePage } from "../pages/pi-message-page";

const captureScreenshot = async (
  page: Page,
  testInfo: TestInfo,
  name: string,
) => {
  const path = testInfo.outputPath(`${name}.png`);

  await page.screenshot({ fullPage: true, path });
  await testInfo.attach(name, { contentType: "image/png", path });
};

test("正常入力、待機状態、結果表示のスクリーンショットを撮影できる", async ({
  page,
}, testInfo) => {
  await page.clock.install();
  await page.addInitScript(() => {
    Math.random = () => 0.99;
  });

  const piMessagePage = new PiMessagePage(page);
  await piMessagePage.goto();

  await test.step("正常入力画面", async () => {
    await piMessagePage.messageInput.fillMessageInput("a");
    await expect(piMessagePage.messageInput.getMessageInput).toHaveValue("a");
    await captureScreenshot(page, testInfo, "normal-input");
  });

  await test.step("待機状態画面", async () => {
    await piMessagePage.messageInput.submitMessage();
    await expect(
      piMessagePage.progressingMessage.getProgressMessage,
    ).toBeVisible();
    await captureScreenshot(page, testInfo, "progress");
  });

  await test.step("結果表示画面", async () => {
    await page.clock.fastForward(2_000);
    await expect(piMessagePage.messageResult.getMessageResult).toHaveText(
      "eでは伝わるのかな？",
    );
    await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
    await captureScreenshot(page, testInfo, "result");
  });
});
