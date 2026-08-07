import { render, screen } from "@testing-library/react";
import { Layout } from "./layout";
import type { ComponentProps } from "react";
import { MemoryRouter } from "react-router";

type Props = ComponentProps<typeof Layout>;

const defaultProps: Props = {
  title: "",
  children: <></>,
};

const setup = (props: Partial<Props> = {}) => {
  render(
    <MemoryRouter>
      <Layout {...defaultProps} {...props} />
    </MemoryRouter>,
  );
};

test("ヘッダーが表示される", () => {
  setup();

  expect(screen.getByRole("banner")).toBeVisible();
});

test("フッターが表示される", () => {
  setup();

  expect(screen.getByRole("contentinfo")).toBeVisible();
});

test("タイトルが表示される", () => {
  const title = "pi-message";
  setup({ title });

  expect(screen.getByRole("heading", { name: title })).toBeVisible();
});
