import type { ReactElement } from "react";
import { Footer } from "./footer";
import { Header } from "./header";

type Props = {
  title: string | undefined;
  children: ReactElement;
};

export const Layout = (props: Props) => {
  const { children, title } = props;

  return (
    <div className={"flex min-h-screen flex-col"}>
      <Header />

      {title && <h1>{title}</h1>}

      {children}

      <Footer />
    </div>
  );
};
