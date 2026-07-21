import logoImage from "../assets/pi-lab-logo.png";

export const Header = () => {
  return (
    <header>
      <h2>{"割り切れない研究所"}</h2>
      <img src={logoImage} alt={"pi-lab-logo-image"} />
    </header>
  );
};
