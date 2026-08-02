import { Link } from "react-router";
import { paths } from "../../../types/page-texts";

export const Links = () => {
  return (
    <ul className={"text-center"}>
      <li>
        <Link to={paths.piMessage}>{"πで伝える"}</Link>
      </li>
    </ul>
  );
};
