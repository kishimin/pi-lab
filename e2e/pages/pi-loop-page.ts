import { Locator, Page } from "playwright/test";
import { BasePage } from "./base/base-page";

/** Pi Loop */
export class PiLoopPage extends BasePage {
  readonly getList: Locator;
  readonly getPiMessageLink: Locator;

  /** initialize */
  constructor(page: Page) {
    super(page);
    this.getList = page.getByRole("list");
    this.getPiMessageLink = this.getList
      .getByRole("listitem")
      .getByRole("link", { name: /πで伝える/ });
  }

  /** transition */
  async goto() {
    await this.page.goto("/");
  }

  /** move pi message */
  async gotoPiMessage() {
    await this.getPiMessageLink.click();
  }
}
