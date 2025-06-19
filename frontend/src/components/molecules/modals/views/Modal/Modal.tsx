'use client';

import React, { FC } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import ReactDOM from 'react-dom';

import Fade from 'atoms/fade/Fade';
import useOverflowBody from 'utils/hooks/ui/useOverflowBody';

import cl from './Modal.module.scss';

/* 
 Стандартная абстрактная переиспользуемая модалка для 90% задач, 
 модалка на весь экран по середине, с fade, привязан hook с overflow body
*/

export type TFullPageModal = {
  isOpen: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  isFade?: boolean;
  onClickFade?: boolean;
  disableFadeClick?: boolean;
};

const standartModalAnimations = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      ease: 'easeOut',
      duration: 0.15,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      ease: 'easeOut',
      duration: 0.25,
    },
  },
};

const FullPageModal: FC<TFullPageModal> = ({
  isOpen,
  children,
  isFade = true,
  disableFadeClick,
  onClose,
}) => {
  const modalRootEl = document.getElementById('modal-root')!;
  useOverflowBody(isOpen);

  const onFadeClick = () => {
    if (disableFadeClick || !onClose) return;
    onClose();
  };

  return modalRootEl
    ? ReactDOM.createPortal(
        <AnimatePresence>
          {isOpen && (
            <motion.div
              {...standartModalAnimations}
              onClick={(e) => e.stopPropagation()}
              className={cl.modal}>
              {isFade && <Fade onClickFade={onFadeClick} />}
              {children}
            </motion.div>
          )}
        </AnimatePresence>,
        modalRootEl,
      )
    : null;
};

export default FullPageModal;
