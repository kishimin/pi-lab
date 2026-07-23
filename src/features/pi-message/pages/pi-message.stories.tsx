import type { Meta, StoryObj } from "@storybook/react-vite";
import { PiMessagePage } from "./pi-message";
import { expect } from "storybook/test";

const meta = {
  component: PiMessagePage,
} satisfies Meta<typeof PiMessagePage>;

export default meta;
type Story = StoryObj<typeof PiMessagePage>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("ヘッダーが表示される", async () => {
      await expect(canvas.getByRole("banner")).toBeVisible();
    });

    await step("πで伝えるのheadingが表示される", async () => {
      await expect(
        canvas.getByRole("heading", { name: "πで伝える" }),
      ).toBeVisible();
    });

    await step("フッターが表示される", async () => {
      await expect(canvas.getByRole("contentinfo")).toBeVisible();
    });
  },
};
