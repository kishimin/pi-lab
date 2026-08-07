import type { Page } from "playwright/test";
import { expect, test } from "../fixtures/test";

const compareScreenshot = async (page: Page, name: string) => {
  await expect(page).toHaveScreenshot(name, {
    fullPage: true,
  });
};

test.describe("割り切れない研究所 VRT", () => {
  test("一覧からπで伝える結果と再試行までの表示を基準画像と比較する", async ({
    page,
    piLoopPage,
    piMessagePage,
  }) => {
    await page.addInitScript(() => {
      Math.random = () => 0.5;
    });
    await piLoopPage.goto();
    await expect(piLoopPage.getListItemLink(/πで伝える/)).toBeVisible();
    await compareScreenshot(page, "01-pi-loop.png");

    await piLoopPage.gotoListItem(/πで伝える/);
    await expect(page).toHaveURL("/pi-message");
    await expect(piMessagePage.getPageTitle).toBeVisible();

    await piMessagePage.messageInput.fillMessageInput("割り切れない研究所");
    await expect(piMessagePage.messageInput.getMessageInput).toHaveValue(
      "割り切れない研究所",
    );
    await compareScreenshot(page, "02-pi-message-input.png");

    await piMessagePage.messageInput.submitMessage();
    await expect(
      piMessagePage.progressingMessage.getProgressMessage,
    ).toBeVisible();
    await compareScreenshot(page, "03-pi-message-progress.png");

    await expect(piMessagePage.messageResult.getMessageResult).toBeVisible();
    await expect(piMessagePage.messageResult.getRetryButton).toBeVisible();
    await compareScreenshot(page, "04-pi-message-result.png");

    await piMessagePage.messageResult.retryMessage();
    await expect(piMessagePage.messageInput.getMessageInput).toBeVisible();
    await expect(piMessagePage.messageInput.getMessageInput).toHaveValue("");
    await compareScreenshot(page, "05-pi-message-retry.png");
  });
});
