import { render, screen } from "@testing-library/react";
import { PiMessagePage } from "./pi-message";
import userEvent from "@testing-library/user-event";

test("待機状態から2秒後別のメッセージを試すボタンが表示される", async () => {
  render(<PiMessagePage />);
  const user = userEvent.setup();

  await user.type(screen.getByRole("textbox", { name: "メッセージ" }), "a");
  await user.click(screen.getByRole("button", { name: "πで伝える" }));

  expect(
    screen.getByRole("heading", {
      name: "割り切れないため処理に時間がかかっています",
    }),
  ).toBeVisible();

  expect(
    await screen.findByRole(
      "button",
      { name: "別のメッセージを試す" },
      { timeout: 3000 },
    ),
  ).toBeVisible();
});
