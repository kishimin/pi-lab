import type { Meta, StoryObj } from "@storybook/react-vite";
import { Footer } from "./footer";
import { expect } from "storybook/test";

const meta = {
  component: Footer,
} satisfies Meta<typeof Footer>;

export default meta;

type Story = StoryObj<typeof Footer>;

/** デフォルト */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("フッターが表示される", async () => {
      await expect(canvas.getByRole("contentinfo")).toBeVisible();
    });
  },
};
