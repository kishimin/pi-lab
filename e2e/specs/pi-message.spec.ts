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

test.describe("πで伝える", () => {
  test("メッセージを入力して、最終的にメッセージの結果が表示され、別のメッセージを試すことができる", async ({
    page,
  }, testInfo) => {
    const piMessagePage = new PiMessagePage(page);

    await page.clock.install();
    await piMessagePage.goto();

    await test.step("メッセージを入力", async () => {
      await piMessagePage.messageInput.fillMessageInput("a");
      await expect(piMessagePage.messageInput.getMessageInput).toHaveValue("a");
      await captureScreenshot(page, testInfo, "normal-input");
    });

    await test.step("待機状態", async () => {
      await page.clock.pauseAt(Date.now() + 60_000);
      await piMessagePage.messageInput.submitMessage();
      await expect(
        piMessagePage.progressingMessage.getProgressMessage,
      ).toBeVisible();
      await captureScreenshot(page, testInfo, "progress");
    });

    await test.step("メッセージ結果表示", async () => {
      await page.clock.fastForward(2_000);
      await expect(piMessagePage.messageResult.getMessageResult).toBeVisible();
      await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
      await captureScreenshot(page, testInfo, "result");
    });
  });
});
