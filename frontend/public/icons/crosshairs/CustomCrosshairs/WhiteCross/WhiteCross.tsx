import cn from 'classnames';

import Crosshair from '../../Crosshair/Crosshair';

import cl from './WhiteCross.module.scss';

interface IWhiteCross {
  onClick: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
  className?: string;
}

const WhiteCross = ({ onClick, className }: IWhiteCross) => {
  return (
    <div onClick={() => onClick}>
      <Crosshair width={25} height={25} className={cn(className, cl.whiteCross)} />
    </div>
  );
};

export default WhiteCross;
