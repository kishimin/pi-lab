import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./acceptance",
  testMatch: ["pi-receipt.medium.test.ts"],
  use: { baseURL: "http://127.0.0.1:5178", ...devices["Desktop Chrome"] },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: { command: "npm run dev -- --host 127.0.0.1 --port 5178 --strictPort", url: "http://127.0.0.1:5178", reuseExistingServer: false },
});
