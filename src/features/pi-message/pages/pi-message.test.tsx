import { render, screen } from "@testing-library/react";
import { PiMessagePage } from "./pi-message";
import userEvent from "@testing-library/user-event";
import { act } from "react";
import { vi } from "vitest";
import { MemoryRouter } from "react-router";

beforeEach(() => {
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
});

const setup = () => {
  const user = userEvent.setup();
  render(
    <MemoryRouter>
      <PiMessagePage />
    </MemoryRouter>,
  );

  return { user };
};

test("待機状態から2秒後別のメッセージの結果画面が表示される", async () => {
  const { user } = setup();
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

test("別のメッセージを試すボタンをクリックすると空のメッセージ入力画面が表示される", async () => {
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "メッセージ" }), "a");
  await user.click(screen.getByRole("button", { name: "πで伝える" }));
  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });

  await user.click(
    screen.getByRole("button", { name: "別のメッセージを試す" }),
  );

  expect(screen.getByRole("textbox", { name: "メッセージ" })).toHaveValue("");
});

test("メッセージ入力画面から2秒後別のメッセージの結果画面が表示されない", async () => {
  setup();

  await act(async () => {
    await vi.advanceTimersByTimeAsync(2000);
  });

  expect(
    screen.queryByRole("button", { name: "別のメッセージを試す" }),
  ).not.toBeInTheDocument();
});
