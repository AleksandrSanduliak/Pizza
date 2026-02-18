import cn from 'classnames';

import { useCardContext } from '../../../../model/context';

import cl from './Text.module.scss';

const Text = () => {
  const { product } = useCardContext();

  return (
    <div className={cl.text}>
      <p className={cn('subtitle', cl.textTitle)}>{product.title}</p>
      <p className={cn('normal', cl.textDesc)}>{product.desc}</p>
    </div>
  );
};

export default Text;
