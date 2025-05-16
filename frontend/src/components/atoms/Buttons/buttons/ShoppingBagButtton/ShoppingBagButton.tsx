import cn from 'classnames';

import shoppingBagImg from 'assets/icons/buttons/shoppingBag.svg';
import BaseButton from 'atoms/Buttons/BaseButton';
import { useAppSelector } from 'utils/hooks/redux';

import cl from './ShoppingBagButton.module.scss';

const ShoppingBagButton = () => {
  const totalCount = useAppSelector((state) => state.reducer.cartShopSlice.totalCount);
  return (
    <BaseButton className={cl.shoppingBagButton} buttonMode="primary" type="submit">
      <img loading="lazy" src={shoppingBagImg} alt="Иконка Корзины" />
      <p className={cn('normal', cl.summary)}>
        <span>{totalCount}</span>
      </p>
    </BaseButton>
  );
};

export default ShoppingBagButton;
