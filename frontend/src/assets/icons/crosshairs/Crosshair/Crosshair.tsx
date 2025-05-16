import cn from 'classnames';

import crosshair from '../crosshair.svg';
import cl from './Crosshair.module.scss';

interface ICrosshair {
  className?: string;
  width?: number;
  height?: number;
  onClick?: () => void;
}

const Crosshair = ({ className, width, height, onClick }: ICrosshair) => {
  const styles = {
    width: `${width}px`,
    height: `${height}px`,
  };

  return (
    <img
      loading="lazy"
      width="24"
      height="24"
      src={crosshair}
      style={styles}
      alt="Кнопка закрытия окна"
      className={cn(cl.crosshair, className)}
      onClick={() => {
        if (!onClick) return;
        onClick();
      }}
    />
  );
};

export default Crosshair;
