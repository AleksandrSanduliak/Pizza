/* eslint-disable react/react-in-jsx-scope */
import { AnimatePresence, motion } from 'framer-motion';
import { FC } from 'react';
import Fade from '../../../atoms/fade/Fade';
import cl from './modal.module.scss';
import ReactDOM from 'react-dom';
import {
  addOverflowHiddenToBody,
  removeOverflowHiddenToBody,
} from 'utils/funcs/bodyOverflow';

export type TModal = {
  isOpen: boolean;
  setIsOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  isFade?: boolean;
  onClickFade?: boolean;
  disableFadeClick?: boolean;
};

const modalRootEl = document.getElementById('modal-root')!;
const Modal: FC<TModal> = ({
  isOpen,
  children,
  isFade = true,
  disableFadeClick,
  setIsOpen,
}) => {
  if (isOpen) {
    addOverflowHiddenToBody();
  } else {
    removeOverflowHiddenToBody();
  }

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
              ease: 'easeOut',
              duration: 0.15,
            },
          }}
          exit={{
            opacity: 0,
            transition: {
              ease: 'easeOut',
              duration: 0.25,
            },
          }}
          className={`${cl.modal}`}>
          {isFade && (
            <Fade
              onClickFade={() => {
                if (disableFadeClick) return;
                setIsOpen(false);
              }}
            />
          )}
          {children}
        </motion.div>
      )}
    </AnimatePresence>,
    modalRootEl,
  );
};

export default Modal;
