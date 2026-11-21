import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { afterEach, expect, test, vi } from "vitest";
import { PiReceiptPage } from "./pi-receipt";

const originalGetContext = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "getContext");
const originalToBlob = Object.getOwnPropertyDescriptor(HTMLCanvasElement.prototype, "toBlob");
const originalCreateUrl = Object.getOwnPropertyDescriptor(URL, "createObjectURL");
const originalRevokeUrl = Object.getOwnPropertyDescriptor(URL, "revokeObjectURL");

const setup = () => {
  const user = userEvent.setup();
  render(<MemoryRouter><PiReceiptPage /></MemoryRouter>);
  return { user };
};

const setupImage = () => {
  const context = { fillStyle: "", font: "", textAlign: "", fillRect: vi.fn(), fillText: vi.fn() };
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { configurable: true, value: () => context });
  Object.defineProperty(HTMLCanvasElement.prototype, "toBlob", { configurable: true, value: (callback: BlobCallback) => callback(new Blob(["image"], { type: "image/png" })) });
  Object.defineProperty(URL, "createObjectURL", { configurable: true, value: vi.fn(() => "blob:receipt") });
  Object.defineProperty(URL, "revokeObjectURL", { configurable: true, value: vi.fn() });
  return vi.spyOn(HTMLAnchorElement.prototype, "click").mockImplementation(() => {});
};

const restore = (object: object, name: string, descriptor: PropertyDescriptor | undefined) => {
  if (descriptor) Object.defineProperty(object, name, descriptor);
  else Reflect.deleteProperty(object, name);
};

afterEach(() => {
  restore(HTMLCanvasElement.prototype, "getContext", originalGetContext);
  restore(HTMLCanvasElement.prototype, "toBlob", originalToBlob);
  restore(URL, "createObjectURL", originalCreateUrl);
  restore(URL, "revokeObjectURL", originalRevokeUrl);
  Reflect.deleteProperty(navigator, "share");
  Reflect.deleteProperty(navigator, "canShare");
  vi.restoreAllMocks();
});

test("複数の商品を入力してレシートを生成し、再生成できる", async () => {
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "商品名" }), "コーヒー");
  await user.type(screen.getByRole("spinbutton", { name: "金額" }), "314");
  await user.click(screen.getByRole("button", { name: "商品を追加" }));
  await user.type(screen.getAllByRole("textbox", { name: "商品名" })[1], "ケーキ");
  await user.type(screen.getAllByRole("spinbutton", { name: "金額" })[1], "271");
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  expect(screen.getByRole("region", { name: "πレシート" })).toHaveTextContent("603");
  expect(screen.getByRole("region", { name: "πレシート" })).toHaveTextContent("18");
  expect(screen.getByRole("region", { name: "πレシート" })).toHaveTextContent("πのおまけ");
  await user.click(screen.getByRole("button", { name: "再生成" }));
  expect(screen.getByText("ケーキ")).toBeVisible();
});

test("不正な商品にはエラーが表示される", async () => {
  const { user } = setup();
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  expect(screen.getByRole("alert")).toBeVisible();
  expect(screen.queryByRole("region", { name: "πレシート" })).not.toBeInTheDocument();
});

test("レシート画像を保存できる", async () => {
  const click = setupImage();
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "商品名" }), "コーヒー");
  await user.type(screen.getByRole("spinbutton", { name: "金額" }), "314");
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  await user.click(screen.getByRole("button", { name: "画像を保存" }));
  expect(click).toHaveBeenCalled();
});

test("画像の生成に失敗すると保存できないことを案内する", async () => {
  Object.defineProperty(HTMLCanvasElement.prototype, "getContext", { configurable: true, value: () => null });
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "商品名" }), "コーヒー");
  await user.type(screen.getByRole("spinbutton", { name: "金額" }), "314");
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  await user.click(screen.getByRole("button", { name: "画像を保存" }));
  expect(await screen.findByRole("alert")).toHaveTextContent("画像を保存できませんでした");
});

test("対応端末でレシート画像を共有できる", async () => {
  setupImage();
  const share = vi.fn().mockResolvedValue(undefined);
  Object.defineProperty(navigator, "share", { configurable: true, value: share });
  Object.defineProperty(navigator, "canShare", { configurable: true, value: () => true });
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "商品名" }), "コーヒー");
  await user.type(screen.getByRole("spinbutton", { name: "金額" }), "314");
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  await user.click(screen.getByRole("button", { name: "画像を共有" }));
  expect(share).toHaveBeenCalled();
});

test("共有に失敗した後も共有に成功すればエラーは消える", async () => {
  setupImage();
  Object.defineProperty(navigator, "share", { configurable: true, value: vi.fn().mockResolvedValue(undefined) });
  const canShare = vi.fn().mockReturnValueOnce(false).mockReturnValue(true);
  Object.defineProperty(navigator, "canShare", { configurable: true, value: canShare });
  const { user } = setup();
  await user.type(screen.getByRole("textbox", { name: "商品名" }), "コーヒー");
  await user.type(screen.getByRole("spinbutton", { name: "金額" }), "314");
  await user.click(screen.getByRole("button", { name: "レシートを作る" }));
  await user.click(screen.getByRole("button", { name: "画像を共有" }));
  expect(await screen.findByRole("alert")).toBeVisible();
  await user.click(screen.getByRole("button", { name: "画像を共有" }));
  expect(screen.queryByRole("alert")).not.toBeInTheDocument();
});
