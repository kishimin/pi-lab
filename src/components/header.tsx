import { Link } from "react-router";
import logoImage from "../assets/pi-lab-logo.png";
import { paths } from "../types/page-texts";

export const Header = () => {
  return (
    <header className={"flex items-center gap-2 bg-[#7cc7e8] px-4"}>
      <Link to={paths.index}>
        <h2 className={"-translate-y-0.5 text-2xl font-bold md:text-4xl"}>
          {"割り切れない研究所"}
        </h2>
      </Link>
      <img
        src={logoImage}
        alt={"pi-lab-logo-image"}
        className={"w-1/5 translate-y-0.5 md:h-16 md:w-auto"}
      />
    </header>
  );
};
