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
    await step("πで伝えるのheadingが表示される", async () => {
      await expect(
        canvas.getByRole("heading", { name: "πで伝える" }),
      ).toBeVisible();
    });

    await step("メッセージのテキスト入力が表示される", async () => {
      await expect(
        canvas.getByRole("textbox", { name: "メッセージ" }),
      ).toBeVisible();
    });

    await step("πで伝えるボタンが表示される", async () => {
      await expect(
        canvas.getByRole("button", { name: "πで伝える" }),
      ).toBeVisible();
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

        await expect(
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

        await expect(canvas.getByText("メッセージは必須です")).toBeVisible();
      },
    );
  },
};

/** Form Submission Success Status */
export const SubmitFormSuccess: Story = {
  play: async ({ step, canvas, userEvent }) => {
    await step(
      "メッセージのエラーがない時πで伝えるボタンをクリックすると待機状態となる",
      async () => {
        await userEvent.type(
          canvas.getByRole("textbox", { name: "メッセージ" }),
          "a",
        );

        await userEvent.click(
          canvas.getByRole("button", { name: "πで伝える" }),
        );

        await expect(
          canvas.getByRole("heading", {
            name: "割り切れないため処理に時間がかかっています",
          }),
        ).toBeVisible();
      },
    );
  },
};
