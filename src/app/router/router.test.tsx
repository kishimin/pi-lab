import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { paths } from "../../types/page-texts";
import { RouterContents } from "./router";

const setup = (initialEntry: string) => {
  const user = userEvent.setup();
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <RouterContents />
    </MemoryRouter>,
  );

  return { user };
};

describe("RouterContents", () => {
  test("一覧画面からπで伝える画面に遷移する", async () => {
    const { user } = setup(paths.index);

    await user.click(screen.getByRole("link", { name: "πで伝える" }));

    expect(
      screen.getByRole("textbox", { name: "メッセージ" }),
    ).toBeVisible();
  });

  test("πで伝える画面から一覧画面に遷移する", async () => {
    const { user } = setup(paths.piMessage);

    await user.click(
      screen.getByRole("heading", { name: "割り切れない研究所" }),
    );

    expect(screen.getByRole("link", { name: "πで伝える" })).toBeVisible();
  });

  test("フッターからプライバシーポリシーを確認できる", async () => {
    const { user } = setup(paths.index);

    await user.click(screen.getByRole("link", { name: "プライバシーポリシー" }));

    expect(screen.getByRole("heading", { name: "プライバシーポリシー" })).toBeVisible();
    expect(
      screen.getByRole("link", { name: "Google の説明を詳しく見る" }),
    ).toBeVisible();
  });


  test("共有結果ページから自分でメッセージを試せる", async () => {
    const { user } = setup("/pi-message/shared#result=2");

    expect(screen.getByRole("region", { name: "メッセージ結果" })).toBeVisible();
    expect(screen.queryByRole("link", { name: "Xで共有" })).not.toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "別のメッセージを試す" }));
    expect(screen.getByRole("textbox", { name: "メッセージ" })).toBeVisible();
  });


  test("従来の共有リンクでも結果を表示して再試行できる", async () => {
    const { user } = setup("/pi-message#result=2");

    expect(screen.getByRole("region", { name: "メッセージ結果" })).toBeVisible();
    await user.click(screen.getByRole("button", { name: "別のメッセージを試す" }));
    expect(screen.getByRole("textbox", { name: "メッセージ" })).toBeVisible();
  });

});
