import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageResult } from "./message-result";
import { expect, fn } from "storybook/test";

const meta = {
  args: {
    onClickRetryButton: fn(),
  },
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
    const messageResult = canvas.getByRole("region", {
      name: "メッセージ結果",
    });

    await step("メッセージの結果が表示される", async () => {
      await expect(
        messageResult.getByRole("heading", { name: args.message }),
      ).toBeVisible();
    });

    await step("別のメッセージを試すボタンが表示される", async () => {
      await expect(
        messageResult.getByRole("button", {
          name: "別のメッセージを試す",
        }),
      ).toBeVisible();
    });
  },
};
