import { Locator, Page } from "playwright/test";
import { BasePage } from "./base/base-page";

/** 一覧ページ */
export class PiLoopPage extends BasePage {
  readonly getList: Locator;
  readonly getPiMessageLink: Locator;

  /** 初期化 */
  constructor(page: Page) {
    super(page);
    this.getList = page.getByRole("list");
    this.getPiMessageLink = this.getList
      .getByRole("listitem")
      .filter({ has: page.getByRole("link", { name: /πで伝える/ }) });
  }

  /** 遷移 */
  async goto() {
    await this.page.goto("/");
  }
}
