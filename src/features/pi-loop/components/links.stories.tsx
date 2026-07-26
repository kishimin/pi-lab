import type { Meta, StoryObj } from "@storybook/react-vite";
import { Links } from "./links";
import { expect } from "storybook/test";

const meta = {
  component: Links,
} satisfies Meta<typeof Links>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("リストが表示される", async () => {
      await expect(canvas.getByRole("list")).toBeVisible();
    });
  },
};
