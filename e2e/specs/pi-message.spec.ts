import test, { expect } from "playwright/test";
import { PiMessagePage } from "../pages/pi-message-page";

test.describe("πで伝える", () => {
  test("メッセージを入力して、最終的にメッセージの結果が表示され、別のメッセージを試すことができる", async ({
    page,
  }) => {
    const piMessagePage = new PiMessagePage(page);
    await piMessagePage.goto();

    await test.step("メッセージを入力", async () => {
      await piMessagePage.messageInput.fillMessageInput("a");
      await piMessagePage.messageInput.submitMessage();
    });

    await test.step("待機状態", async () => {
      await expect(
        piMessagePage.progressingMessage.getProgressMessage,
      ).toBeVisible();
    });

    await test.step("メッセージ結果表示", async () => {
      await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
    });
  });
});
