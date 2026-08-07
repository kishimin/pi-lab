import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./footer";
import { expect, within } from "storybook/test";

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

/** デフォルト */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    const footer = canvas.getByRole("contentinfo");

    await step("フッターが表示される", async () => {
      await expect(footer).toBeVisible();
    });

    await step("© kishimin 2026のheadingが表示される", async () => {
      await expect(
        within(footer).getByRole("heading", { name: "© kishimin 2026" }),
      ).toBeVisible();
    });
  },
};
