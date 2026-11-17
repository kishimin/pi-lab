import { readFile } from "node:fs/promises";
import { expect, test } from "@playwright/test";

test("CSP を適用した画面で Google タグが初期化される", async ({ page }) => {
  const headers = await readFile("public/_headers", "utf8");
  const policy = headers.match(/Content-Security-Policy:\s*(.+)/)?.[1];
  expect(policy).toBeDefined();

  await page.route("**/gtm.js?id=GTM-T43TDQ53", (route) =>
    route.fulfill({ contentType: "application/javascript", body: "window.googleTagLoaded = true;" }),
  );
  await page.route("**/", async (route) => {
    if (!route.request().isNavigationRequest()) return route.continue();
    const response = await route.fetch();
    await route.fulfill({ response, headers: { ...response.headers(), "content-security-policy": policy! } });
  });

  await page.goto("/");
  await expect.poll(() => page.evaluate("window.googleTagLoaded === true")).toBe(true);
  await expect.poll(() => page.evaluate("window.dataLayer?.some((item) => item[0] === 'js')")).toBe(true);
});
