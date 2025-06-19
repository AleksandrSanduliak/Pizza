import cn from 'classnames';

import BaseButton from 'atoms/Buttons/BaseButton';
import { useAppSelector } from 'store/hooks';

import cl from './ShoppingBagButton.module.scss';

const ShoppingBagButton = () => {
  const totalCount = useAppSelector((state) => state.reducer.cartShopSlice.totalCount);
  return (
    <BaseButton className={cl.shoppingBagButton} buttonMode="primary" type="submit">
      <img loading="lazy" src="/icons/buttons/shoppingBag.svg" alt="Иконка Корзины" />
      <p className={cn('normal', cl.summary)}>
        <span>{totalCount}</span>
      </p>
    </BaseButton>
  );
};

export default ShoppingBagButton;
