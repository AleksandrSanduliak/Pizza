import { AnimatePresence, motion } from "framer-motion";
import React, { FC, SetStateAction } from "react";
import Fade from "../../../atoms/fade/Fade";
import cl from "./modal.module.scss";
import ReactDOM from "react-dom";

export type TModal = {
  isOpen: boolean;
  children?: React.ReactNode;
  isFade?: boolean;
  onClickFade?: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const modalRootEl = document.getElementById("modal-root")!;
const Modal: FC<TModal> = ({ isOpen, children, isFade = true, setIsOpen }) => {
  return ReactDOM.createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            transition: {
              ease: "easeOut",
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              ease: "easeOut",
              duration: 0.25,
            },
          }}
          className={`${cl.modal} ${cl.activeModal}`}
        >
          {isFade && <Fade onClickFade={() => setIsOpen(false)} />}
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    modalRootEl
  );
};

export default Modal;
