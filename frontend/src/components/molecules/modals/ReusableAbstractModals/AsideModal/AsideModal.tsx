import cn from 'classnames';
import ReactDOM from 'react-dom';

import WhiteCross from 'assets/icons/crosshairs/CustomCrosshairs/WhiteCross/WhiteCross';
import Fade from 'atoms/fade/Fade';

import cl from './AsideModal.module.scss';

const CloseModalCross = ({ onClick }) => {
  return <WhiteCross onClick={() => onClick()} className={cn('rotate360deg', cl.img)} />;
};

const modalRootEl = document.getElementById('modal-root')!;

const AsideModal = ({ isFade = true, children, onClick }) => {
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
