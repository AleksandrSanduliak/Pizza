import React, { FC } from "react";
import Fade from "../../atoms/fade/Fade";
import cl from "./modal.module.scss";
import { stopBubling } from "utils/funcs/stopBubling";

type modal = {
  children: React.ReactNode;
  isClicked: boolean;
};

const Modal: FC<modal> = React.memo(({ isClicked, children }) => {
  console.log(isClicked, "isClicked");
  console.log("modal render");
  return (
    <div className={`${cl.modal} ${isClicked ? cl.activeModal : ""}`}>
      <Fade isClicked={isClicked} />
      <div onClick={stopBubling} className={cl.modal__content}>
        {children}
      </div>
    </div>
  );
});

export default React.memo(Modal);
