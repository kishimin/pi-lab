import { test as base } from "playwright/test";
import { PiLoopPage } from "../pages/pi-loop-page";
import { PiMessagePage } from "../pages/pi-message-page";

type PageObjectFixtures = {
  piLoopPage: PiLoopPage;
  piMessagePage: PiMessagePage;
};

export const test = base.extend<PageObjectFixtures>({
  page: async ({ baseURL, page }, use) => {
    if (baseURL === undefined) {
      throw new Error("Playwright baseURL must be configured");
    }

    await page.goto(baseURL);
    await use(page);
  },
  piLoopPage: async ({ page }, use) => {
    await use(new PiLoopPage(page));
  },
  piMessagePage: async ({ page }, use) => {
    await use(new PiMessagePage(page));
  },
});

export { expect } from "playwright/test";
