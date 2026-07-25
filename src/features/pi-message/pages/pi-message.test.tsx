import { render, screen } from "@testing-library/react";
import { PiMessagePage } from "./pi-message";
import { vi } from "vitest";
import userEvent from "@testing-library/user-event";

test("待機状態から2秒後別のメッセージを試すボタンが表示される", async () => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
  render(<PiMessagePage />);
  const user = userEvent.setup();

  await user.type(screen.getByRole("textbox", { name: "メッセージ" }), "a");
  await user.click(screen.getByRole("button", { name: "πで伝える" }));

  expect(
    screen.getByRole("heading", {
      name: "割り切れないため処理に時間がかかっています",
    }),
  ).toBeVisible();

  vi.advanceTimersByTime(2000);

  expect(
    await screen.findByRole("button", { name: "別のメッセージを試す" }),
  ).toBeVisible();
});
