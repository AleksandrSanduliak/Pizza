import cn from 'classnames';

import cl from './WhiteCross.module.scss';
import Crosshair from '../../Crosshair/Crosshair';

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
