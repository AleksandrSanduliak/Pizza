import { MouseEventHandler } from 'react';
import cl from './fade.module.scss';

interface IFade {
  onClickFade: MouseEventHandler<HTMLDivElement> | undefined;
}

const Fade = ({ onClickFade }: IFade) => {
  return <div onClick={() => onClickFade()} className={cl.wrapper} />;
};

export default Fade;
