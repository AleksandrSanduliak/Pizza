import React, { JSX, useRef } from 'react';
import { createPortal } from 'react-dom';

interface IPortal {
  target: string;
  isShow: boolean;
  children: JSX.Element;
}

const Portal = ({ target, isShow, children }: IPortal) => {
  const ref = useRef<Element | null>();
  React.useEffect(() => {
    ref.current = document.getElementById(target);
  }, [target]);

  return isShow && ref.current ? createPortal(children, ref.current) : null;
};

export default Portal;
