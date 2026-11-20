import { Link } from "react-router";
import { paths } from "../types/page-texts";

export const Footer = () => {
  return (
    <footer className={"mt-auto bg-[#7cc7e8] px-4 py-2 text-center"}>
      <Link className={"underline"} to={paths.privacy}>
        {"プライバシーポリシー"}
      </Link>
      <h3>{"© kishimin 2026"}</h3>
    </footer>
  );
};
