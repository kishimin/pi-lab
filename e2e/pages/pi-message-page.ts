import { Locator, Page } from "playwright/test";
import { BasePage } from "./base/base-page";

/** Pi Message */
export class PiMessagePage extends BasePage {
  readonly getPageTitle: Locator;
  readonly getMessageInput: Locator;
  readonly getPiMessageButton: Locator;

  /** initialize */
  constructor(page: Page) {
    super(page);
    this.getPageTitle = this.page.getByRole("heading", { name: /πで伝える/ });
    this.getMessageInput = this.page.getByRole("textbox", {
      name: /メッセージ/,
    });
    this.getPiMessageButton = this.page.getByRole("button", {
      name: /πで伝える/,
    });
  }

  /** transition */
  async goto() {
    await this.page.goto("/pi-message");
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
