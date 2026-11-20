import { Link } from "react-router";
import { paths } from "../types/page-texts";

export const Footer = () => {
  return (
    <footer className={"mt-auto bg-[#7cc7e8] px-4 py-2 text-center"}>
      <a className={"underline"} href={"https://docs.google.com/forms/d/e/1FAIpQLSfLJwKfm5KNU8FC44eO5qQuoWCp0mEiMNW5vveZC0OXtXLnPw/viewform"}>
        {"お問い合わせ"}
      </a>
      <Link className={"underline"} to={paths.privacy}>
        {"プライバシーポリシー"}
      </Link>
      <h3>{"© kishimin 2026"}</h3>
    </footer>
  );
};
