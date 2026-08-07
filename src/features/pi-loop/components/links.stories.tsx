import type { Meta, StoryObj } from "@storybook/react-vite";
import { Links } from "./links";
import { expect, within } from "storybook/test";

const meta = {
  component: Links,
} satisfies Meta<typeof Links>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Default state */
export const Default: Story = {
  play: async ({ step, canvas }) => {
    const list = canvas.getByRole("list");

    await step("リストが表示される", async () => {
      await expect(list).toBeVisible();
    });

    const listItems = within(list).getAllByRole("listitem");

    await step("リンクが表示される", async () => {
      const expected = ["πで伝える"];
      for (let index = 0; index < listItems.length; index++) {
        await expect(
          within(listItems[index]).getByRole("link", { name: expected[index] }),
        ).toBeVisible();
      }
    });
  },
};
