import React, { FC } from "react";
import Fade from "../../atoms/fade/Fade";
import cl from "./modal.module.scss";
import { stopBubling } from "../../../utils/funcs/stopBubling";

type modal = {
  children: React.ReactNode;
  isClicked: boolean;
};
const Modal: FC<modal> = ({ isClicked, children }) => {
  const [isClickeds, setIsClicked] = React.useState(false);
  const onClickModal = () => {
    console.log("click modal");
    setIsClicked(true);
  };
  return (
    <div
      onClick={onClickModal}
      className={cl.modal + ` ${isClicked ? cl.active__modal : ""}`}
    >
      <Fade isClicked={isClicked} />
      <div onClick={stopBubling} className={cl.modal__content}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
