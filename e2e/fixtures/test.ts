import { test as base } from "playwright/test";
import { PiLoopPage } from "../pages/pi-loop-page";
import { PiMessagePage } from "../pages/pi-message-page";

type PageObjectFixtures = {
  piLoopPage: PiLoopPage;
  piMessagePage: PiMessagePage;
};

export const test = base.extend<PageObjectFixtures>({
  page: async ({ baseURL, page }, provide) => {
    if (baseURL === undefined) {
      throw new Error("Playwright baseURL must be configured");
    }

    await page.goto(baseURL);
    await provide(page);
  },
  piLoopPage: async ({ page }, provide) => {
    await provide(new PiLoopPage(page));
  },
  piMessagePage: async ({ page }, provide) => {
    await provide(new PiMessagePage(page));
  },
});

export { expect } from "playwright/test";
