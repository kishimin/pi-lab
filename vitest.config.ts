import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  configDefaults,
  defineConfig,
  mergeConfig,
} from "vitest/config";
import viteConfig from "./vite.config.ts";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const defaultAndE2EExcludes = [...configDefaults.exclude, "**/e2e/**"];

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      reporters: process.env.GITHUB_ACTIONS
        ? ["dot", "github-actions", "json"]
        : ["dot"],
      outputFile: "test-result.json",
      exclude: defaultAndE2EExcludes,
      projects: [
        {
          extends: true,
          test: {
            globals: true,
            environment: "jsdom",
            setupFiles: ["./src/tests/setup.ts"],
            exclude: [
              ...defaultAndE2EExcludes,
              "**/*.stories.{ts,tsx,mdx}",
              "**/.storybook/**",
            ],
          },
        },
        {
          extends: true,
          plugins: [
            storybookTest({
              configDir: path.join(dirname, ".storybook"),
            }),
          ],
          test: {
            name: "storybook",
            browser: {
              enabled: true,
              headless: true,
              provider: playwright({}),
              instances: [
                {
                  browser: "chromium",
                },
              ],
            },
          },
        },
      ],
    },
  }),
);
