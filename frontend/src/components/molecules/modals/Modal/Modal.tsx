import { AnimatePresence, motion } from 'framer-motion';
import React, { FC, memo } from 'react';
import ReactDOM from 'react-dom';
import useOverflowBody from 'utils/hooks/useOverflowBody';
import Fade from '../../../atoms/fade/Fade';
import cl from './modal.module.scss';

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
  useOverflowBody(isOpen);
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
          onClick={(e) => e.stopPropagation()}
          className={cl.modal}>
          {isFade && (
            <Fade
              onClickFade={() => {
                if (disableFadeClick) return;
                setIsOpen(false);
                // removeOverflowHiddenToBody();
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

export default memo(Modal);
