import logoImage from "../assets/pi-lab-logo.png";

export const Header = () => {
  return (
    <header className={"flex items-center bg-[#7cc7e8]"}>
      <h2>{"割り切れない研究所"}</h2>
      <img
        src={logoImage}
        alt={"pi-lab-logo-image"}
        className={"w-1/5 md:w-1/10"}
      />
    </header>
  );
};
