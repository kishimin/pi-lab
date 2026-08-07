import { Locator, Page } from "playwright/test";

/** Progress State */
export class ProgressingMessage {
  readonly getProgressMessage: Locator;

  /** Initialize */
  constructor(page: Page) {
    this.getProgressMessage = page.getByRole("heading", {
      name: /割り切れないため処理に時間がかかっています/,
    });
  }
}
