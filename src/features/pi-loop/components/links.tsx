import { Link } from "react-router";
import { PATHS } from "../../../types/path";

export const Links = () => {
  return (
    <ul>
      <li>
        <Link to={PATHS.piMessage}>{"πで伝える"}</Link>
      </li>
    </ul>
  );
};
