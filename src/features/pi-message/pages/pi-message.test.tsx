import { render, screen } from "@testing-library/react";
import { PiMessagePage } from "./pi-message";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { vi } from "vitest";

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

test("待機状態から2秒後別のメッセージの結果画面が表示される", async () => {
  render(<PiMessagePage />);
  const user = userEvent.setup();

  await user.type(screen.getByRole("textbox", { name: "メッセージ" }), "a");
  await user.click(screen.getByRole("button", { name: "πで伝える" }));

  expect(
    screen.getByRole("heading", {
      name: "割り切れないため処理に時間がかかっています",
    }),
  ).toBeVisible();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });

  expect(
    screen.getByRole("button", { name: "別のメッセージを試す" }),
  ).toBeVisible();
  expect(screen.getByRole("banner")).toBeVisible();
});
