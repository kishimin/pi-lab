import { Locator, Page } from "playwright/test";

/** Message Result */
export class MessageResult {
  readonly getMessageResult: Locator;
  readonly getRetryButton: Locator;

  /** Initialize */
  constructor(page: Page) {
    this.getMessageResult = page.getByRole("heading", {
      level: 2,
      name: /伝/,
    });
    this.getRetryButton = page.getByRole("button", {
      name: /別のメッセージを試す/,
    });
  }

  /** retry message */
  async retryMessage() {
    await this.getRetryButton.click();
  }
}
