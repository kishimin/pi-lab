import { Locator, Page } from "playwright/test";

/** Message Input */
export class MessageInput {
  readonly getMessageInput: Locator;
  readonly getPiMessageButton: Locator;

  /** initialize */
  constructor(page: Page) {
    this.getMessageInput = page.getByRole("textbox", {
      name: /メッセージ/,
    });
    this.getPiMessageButton = page.getByRole("button", {
      name: /πで伝える/,
    });
  }

  /** input Message */
  async fillMessageInput(message: string) {
    this.getMessageInput.fill(message);
  }

  /** submit message */
  async submitMessage() {
    this.getPiMessageButton.click();
  }
}
