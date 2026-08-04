import { Locator, Page } from "playwright/test";

/** Message Result */
export class MessageResult {
  readonly getRetryButton: Locator;
  private readonly page: Page;

  /** Initialize */
  constructor(page: Page) {
    this.page = page;
    this.getRetryButton = this.page.getByRole("button", {
      name: /別のメッセージを試す/,
    });
  }

  getMessageResult(message: string): Locator {
    return this.page.getByRole("heading", { exact: true, name: message });
  }

  /** retry message */
  async retryMessage() {
    await this.getRetryButton.click();
  }
}
