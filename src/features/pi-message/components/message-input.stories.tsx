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

export const Error: Story = {
  play: async ({ step, canvas, userEvent }) => {
    await step(
      "メッセージのテキスト入力がエラーの時エラーメッセージが表示される",
      async () => {
        await userEvent.type(
          canvas.getByRole("textbox", { name: "メッセージ" }),
          "あ".repeat(201),
        );

        expect(
          canvas.getByText("メッセージは200文字以内で入力してください"),
        ).toBeVisible();
      },
    );
  },
};
