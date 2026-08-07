import { Locator, Page } from "playwright/test";
import { BasePage } from "./base/base-page";
import { MessageInput } from "../components/message-input";
import { ProgressingMessage } from "../components/progressing-message";
import { MessageResult } from "../components/message-result";

/** Pi Message */
export class PiMessagePage extends BasePage {
  readonly getPageTitle: Locator;
  readonly messageInput;
  readonly progressingMessage;
  readonly messageResult;

  /** initialize */
  constructor(page: Page) {
    super(page);

    this.getPageTitle = this.page.getByRole("heading", { name: /πで伝える/ });

    this.messageInput = new MessageInput(page);
    this.progressingMessage = new ProgressingMessage(page);
    this.messageResult = new MessageResult(page);
  }

  /** transition */
  async goto() {
    await this.page.goto("/pi-message");
  }
}
