import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "./progress";
import { expect } from "storybook/test";

const meta = {
  component: Progress,
} satisfies Meta<typeof Progress>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    await step("3.14(円周率50桁)...と表示される", () => {
      expect(
        canvas.getByRole("heading", {
          name: "3.14159265358979323846264338327950288419716939937510...",
        }),
      );
    });

    await step("割り切れないため処理に時間がかかっていますと表示される", () => {
      expect(
        canvas.getByRole("heading", {
          name: "割り切れないため処理に時間がかかっています",
        }),
      ).toBeVisible();
    });
  },
};
