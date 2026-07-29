import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { Header } from "./header";

describe("Header", () => {
  test("スマホサイズではロゴがヘッダー幅の20%になる", () => {
    render(<Header />);

    expect(screen.getByAltText("pi-lab-logo-image")).toHaveClass("w-1/5");
  });
});
