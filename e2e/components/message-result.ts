import { Locator, Page } from "playwright/test";

/** Message Result */
export class MessageResult {
  readonly getMessageResult: Locator;
  readonly getRetryButton: Locator;

  /** Initialize */
  constructor(page: Page) {
    const messageResult = page.getByRole("region", {
      name: "メッセージ結果",
    });

    this.getMessageResult = messageResult.getByRole("heading");
    this.getRetryButton = messageResult.getByRole("button", {
      name: "別のメッセージを試す",
    });
  }

  /** retry message */
  async retryMessage() {
    await this.getRetryButton.click();
  }
}
