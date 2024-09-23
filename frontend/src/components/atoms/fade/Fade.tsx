import { Dispatch, FC, SetStateAction } from 'react';
import cl from './fade.module.scss';
import React from 'react';
interface IFade {
  onClickFade: React.MouseEventHandler<HTMLDivElement>;
}

const Fade = ({ onClickFade }: IFade) => {
  return <div onClick={() => onClickFade()} className={cl.wrapper} />;
};

export default Fade;
