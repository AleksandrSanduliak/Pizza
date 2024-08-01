import logo from "assets/icons/pizzaLogo.svg";
import logoLetters from "assets/icons/logo-letters.svg";
import cl from "./logo.module.scss";
import { NavLink } from "react-router-dom";
import { useAppSelector } from "utils/hooks/redux";

type TLogo = {
  headerVisible?: boolean;
  footerLogoStyles?: boolean;
};

const Logo = ({ headerVisible = false, footerLogoStyles = false }: TLogo) => {
  const visible = useAppSelector((store) => store.reducer.isVisible.isVisible);

  const footerLogoWrapper = footerLogoStyles && cl.footerWrapper;
  const footerLogo = footerLogoStyles ? cl.footerImg : cl.img;
  const footerImg = footerLogoStyles ? cl.footerSvg : cl.svg;

  const headerImg = headerVisible && !visible && cl.hiddenSvg;

  return (
    <NavLink to="/" className={`${cl.wrapper} ${footerLogoWrapper}`}>
      <img
        className={footerLogo}
        loading="lazy"
        src={logo}
        alt="Логотип ToTo Pizza"
      />
      <img
        className={`${footerImg} ${headerImg}`}
        loading="lazy"
        src={logoLetters}
        alt="Куда пицца"
      />
    </NavLink>
  );
};

export default Logo;
