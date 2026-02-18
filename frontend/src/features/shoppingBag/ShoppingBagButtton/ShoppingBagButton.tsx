import cn from 'clsx';

import { useAppSelector } from '@shared/store/hooks';
import { Button } from '@shared/ui/button/button';

import cl from './ShoppingBagButton.module.scss';

const ShoppingBagButton = () => {
  const totalCount = useAppSelector((state) => state.reducer.cartShopSlice.totalCount);
  return (
    <Button className={cl.shoppingBagButton} type="submit">
      <img loading="lazy" src="/icons/buttons/shoppingBag.svg" alt="Иконка Корзины" />
      <p className={cn('normal', cl.summary)}>
        <span>{totalCount}</span>
      </p>
    </Button>
  );
};

export default ShoppingBagButton;
