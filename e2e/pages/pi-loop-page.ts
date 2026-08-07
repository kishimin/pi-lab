import { Locator, Page } from "playwright/test";
import { BasePage } from "./base/base-page";

/** Pi Loop */
export class PiLoopPage extends BasePage {
  readonly getList: Locator;

  /** initialize */
  constructor(page: Page) {
    super(page);
    this.getList = page.getByRole("list");
  }

  /** get link locator by list item name */
  getListItemLink(name: string | RegExp): Locator {
    return this.getList.getByRole("listitem").getByRole("link", { name });
  }

  /** transition */
  async goto() {
    await this.page.goto("/");
  }

  /** move to a list item link */
  async gotoListItem(name: string | RegExp) {
    await this.getListItemLink(name).click();
  }
}
