import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./acceptance",
  use: { baseURL: "http://localhost:5173", ...devices["Desktop Chrome"] },
  projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],
  webServer: { command: "npm run dev", url: "http://localhost:5173", reuseExistingServer: !process.env.CI },
});
