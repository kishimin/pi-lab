import { Link } from "react-router";
import logoImage from "../assets/pi-lab-logo.png";
import { paths } from "../types/page-texts";

export const Header = () => {
  return (
    <header className={"flex items-center bg-[#7cc7e8]"}>
      <Link to={paths.index}>
        <h2>{"割り切れない研究所"}</h2>
      </Link>
      <img
        src={logoImage}
        alt={"pi-lab-logo-image"}
        className={"w-1/5 md:w-1/10"}
      />
    </header>
  );
};
