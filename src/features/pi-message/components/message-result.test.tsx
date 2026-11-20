import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import { MessageResult } from "./message-result";

test("コピーできない場合はリンクを選択してコピーできる", async () => {
  const user = userEvent.setup();
  vi.spyOn(navigator.clipboard, "writeText").mockRejectedValueOnce(new Error("unavailable"));
  render(<MessageResult message="πでは伝わりません" shareUrl="https://example.com/pi-message#result=2" onClickRetryButton={() => {}} />);
  await user.click(screen.getByRole("button", { name: "共有リンクをコピー" }));
  expect(screen.getByRole("status")).toHaveTextContent("コピーできませんでした");
  expect(screen.getByRole("textbox", { name: "共有リンク" })).toHaveValue("https://example.com/pi-message#result=2");
});

test("共有に対応する環境で共有できる", async () => {
  const share = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "share", { configurable: true, value: share });
  const user = userEvent.setup();
  render(<MessageResult message="πでは伝わりません" shareUrl="https://example.com/pi-message#result=2" onClickRetryButton={() => {}} />);
  await user.click(screen.getByRole("button", { name: "共有する" }));
  expect(share).toHaveBeenCalledWith({ title: "πで伝える", url: "https://example.com/pi-message#result=2" });
  Reflect.deleteProperty(navigator, "share");
});

test("共有の取消後もリンクをコピーできる", async () => {
  Object.defineProperty(navigator, "share", { configurable: true, value: vi.fn().mockRejectedValue(new Error("cancelled")) });
  const user = userEvent.setup();
  render(<MessageResult message="πでは伝わりません" shareUrl="https://example.com/pi-message#result=2" onClickRetryButton={() => {}} />);
  await user.click(screen.getByRole("button", { name: "共有する" }));
  expect(screen.getByRole("button", { name: "共有リンクをコピー" })).toBeVisible();
  Reflect.deleteProperty(navigator, "share");
});
