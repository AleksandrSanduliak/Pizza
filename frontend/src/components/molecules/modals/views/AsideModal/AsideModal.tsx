'use client';

import cn from 'classnames';
import ReactDOM from 'react-dom';

import Fade from 'atoms/fade/Fade';
import WhiteCross from 'public/icons/crosshairs/CustomCrosshairs/WhiteCross/WhiteCross';

import cl from './AsideModal.module.scss';

const CloseModalCross = ({ onClick }) => {
  return <WhiteCross onClick={() => onClick()} className={cn('rotate360deg', cl.img)} />;
};

const AsideModal = ({ isFade = true, children, onClick }) => {
  const modalRootEl = document.getElementById('modal-root')!;
  return ReactDOM.createPortal(
    <div className={cn(cl.modal)}>
      {isFade && <Fade onClickFade={onClick} />}
      {children}
      <CloseModalCross onClick={onClick} />
    </div>,
    modalRootEl,
  );
};

export default AsideModal;
