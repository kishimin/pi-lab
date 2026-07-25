import type { ReactElement } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  title: string;
  children: ReactElement;
};

export const Layout = (props: Props) => {
  const { children, title } = props;

  return (
    <>
      <Header />

      <h1>{title}</h1>

      {children}

      <Footer />
    </>
  );
};
