import { render, screen } from "@testing-library/react";
import { PiMessagePage } from "./pi-message";
import { vi } from "vitest";
import { act } from "react";
import { userEventSetup } from "../../../tests/utils";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

test("待機状態から2秒後別のメッセージを試すボタンが表示される", async () => {
  render(<PiMessagePage />);
  const user = userEventSetup();

  await user.type(screen.getByRole("textbox", { name: "メッセージ" }), "a");
  await user.click(screen.getByRole("button", { name: "πで伝える" }));

  expect(
    screen.getByRole("heading", {
      name: "割り切れないため処理に時間がかかっています",
    }),
  ).toBeVisible();

  act(() => {
    vi.advanceTimersByTime(2000);
  });

  expect(
    screen.getByRole("button", { name: "別のメッセージを試す" }),
  ).toBeVisible();
});
