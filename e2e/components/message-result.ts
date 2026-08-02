import { Locator, Page } from "playwright/test";

/** Message Result */
export class MessageResult {
  readonly getRetryButton: Locator;

  /** Initialize */
  constructor(page: Page) {
    this.getRetryButton = page.getByRole("button", {
      name: /別のメッセージを試す/,
    });
  }

  /** retry message */
  async retryMessage() {
    this.getRetryButton.click();
  }
}
