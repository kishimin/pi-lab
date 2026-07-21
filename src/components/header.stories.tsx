import type { Meta, StoryObj } from "@storybook/react-vite";
import { Header } from "./header";
import { expect, within } from "storybook/test";

const meta = {
  component: Header,
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof Header>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    const header = canvas.getByRole("banner");
    await step("ヘッダーが表示される", async () => {
      await expect(header).toBeVisible();
    });

    await step("割り切れない研究所のheadingが表示される", async () => {
      await expect(
        within(header).getByRole("heading", { name: "割り切れない研究所" }),
      ).toBeVisible();
    });

    await step("ロゴ画像が表示される", async () => {
      const image = within(header).getByAltText("pi-lab-logo-image");

      await expect(image).toBeInTheDocument();
      await expect(image).toHaveAttribute("src", "/src/assets/pi-lab-logo.png");
    });
  },
};
