import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, test } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router";
import { paths } from "../types/page-texts";
import { Header } from "./header";

describe("Header", () => {
  test("スマホサイズではロゴがヘッダー幅の20%になる", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>,
    );

    expect(screen.getByAltText("pi-lab-logo-image")).toHaveClass("w-1/5");
  });

  test("割り切れない研究所をクリックすると一覧画面に遷移する", async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter initialEntries={[paths.piMessage]}>
        <Header />
        <Routes>
          <Route path={paths.index} element={<p>一覧画面</p>} />
          <Route path={paths.piMessage} element={null} />
        </Routes>
      </MemoryRouter>,
    );

    await user.click(
      screen.getByRole("heading", { name: "割り切れない研究所" }),
    );

    expect(screen.getByText("一覧画面")).toBeVisible();
  });
});
