import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageInput } from "./message-input";
import { expect } from "storybook/test";

const meta = {
  component: MessageInput,
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("メッセージのテキスト入力が表示される", () => {
      expect(canvas.getByRole("textbox", { name: "メッセージ" })).toBeVisible();
    });
  },
};
