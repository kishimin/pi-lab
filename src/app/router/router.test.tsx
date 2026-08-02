import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router";
import { describe, expect, test } from "vitest";
import { paths } from "../../types/page-texts";
import { RouterContents } from "./router";

const setup = (initialEntry: (typeof paths)[keyof typeof paths]) => {
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
});
