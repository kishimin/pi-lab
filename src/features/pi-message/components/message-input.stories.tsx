import type { Meta, StoryObj } from "@storybook/react-vite";
import { MessageInput } from "./message-input";
import { expect } from "storybook/test";

const meta = {
  component: MessageInput,
} satisfies Meta<typeof MessageInput>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("メッセージのテキスト入力が表示される", () => {
      expect(canvas.getByRole("textbox", { name: "メッセージ" })).toBeVisible();
    });

    await step("πで伝えるボタンが表示される", () => {
      expect(canvas.getByRole("button", { name: "πで伝える" })).toBeVisible();
    });
  },
};

/** Error state */
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

/** Form Submission Error Status */
export const SubmitFormError: Story = {
  play: async ({ step, canvas, userEvent }) => {
    await step(
      "πで伝えるボタンをクリックして入力項目がエラーの時入力項目ごとにエラーが表示される",
      async () => {
        await userEvent.click(
          canvas.getByRole("button", { name: "πで伝える" }),
        );

        expect(canvas.getByText("メッセージは必須です")).toBeVisible();
      },
    );
  },
};
