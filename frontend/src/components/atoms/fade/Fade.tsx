import { Dispatch, FC, SetStateAction } from "react";
import cl from "./fade.module.scss";

interface IFade {
  onClickFade: React.MouseEventHandler<HTMLDivElement> | undefined;
}

const Fade = ({ onClickFade }: IFade) => {
  return <div onClick={() => onClickFade} className={cl.wrapper} />;
};

export default Fade;
