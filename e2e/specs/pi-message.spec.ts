import type { Page, TestInfo } from "playwright/test";
import { expect, test } from "../fixtures/test";

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
    piMessagePage,
  }, testInfo) => {
    await piMessagePage.goto();

    await test.step("メッセージを入力", async () => {
      await piMessagePage.messageInput.fillMessageInput("a");
      await expect(piMessagePage.messageInput.getMessageInput).toHaveValue("a");
      await captureScreenshot(page, testInfo, "normal-input");
    });

    await test.step("待機状態", async () => {
      await piMessagePage.messageInput.submitMessage();
      await expect(
        piMessagePage.progressingMessage.getProgressMessage,
      ).toBeVisible();
      await captureScreenshot(page, testInfo, "progress");
    });

    await test.step("メッセージ結果表示", async () => {
      await expect(piMessagePage.messageResult.getMessageResult).toBeVisible();
      await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
      await captureScreenshot(page, testInfo, "result");
    });
  });
});
