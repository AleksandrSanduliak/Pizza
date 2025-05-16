import cn from 'classnames';

import cl from './Text.module.scss';
import { useCardContext } from '../../../CompoundItemContext';

const Text = () => {
  const { foodItem } = useCardContext();

  return (
    <div className={cl.text}>
      <p className={cn('subtitle', cl.textTitle)}>{foodItem.title}</p>
      <p className={cn('normal', cl.textDesc)}>{foodItem.desc}</p>
    </div>
  );
};

export default Text;
