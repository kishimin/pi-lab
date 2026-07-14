import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";
import { expect } from "storybook/test";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("割り切れない研究所のheadingが表示される", async () => {
      await expect(
        canvas.getByRole("heading", { name: "割り切れない研究所" }),
      ).toBeVisible();
    });
  },
};
