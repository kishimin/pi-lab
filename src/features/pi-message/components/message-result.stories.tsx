import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageResult } from "./message-result";
import { expect } from "storybook/test";

const meta = {
  component: MessageResult,
} satisfies Meta<typeof MessageResult>;

export default meta;
type Story = StoryObj<typeof MessageResult>;

/** Default state */
export const Default: Story = {
  args: {
    message: "πでは伝わりません",
  },
  play: async ({ step, canvas, args }) => {
    await step("メッセージの結果が表示される", () => {
      expect(canvas.getByRole("heading", { name: args.message })).toBeVisible();
    });
  },
};
