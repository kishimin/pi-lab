import type { Meta, StoryObj } from "@storybook/react-vite";
import { PiLoopPage } from "./pi-loop";
import { expect } from "storybook/test";

const meta = {
  component: PiLoopPage,
} satisfies Meta<typeof PiLoopPage>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default State */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("割り切れない研究所のheadingが表示される", async () => {
      await expect(
        canvas.getByRole("heading", { name: "割り切れない研究所" }),
      ).toBeVisible();
    });
  },
};
