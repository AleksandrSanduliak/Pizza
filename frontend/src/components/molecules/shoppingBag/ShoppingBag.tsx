import { Button } from 'atoms/button/Button';
import cl from './shoppingbag.module.scss';
import { useAppSelector } from 'utils/hooks/redux';
import shoppingBagImg from 'assets/icons/shoppingBag.svg';
import ShopCartModal from 'molecules/modals/ShoppingCartModal/ShopCartModal';
import useAccount from 'utils/hooks/useAccount';

import ReactDOM from 'react-dom';
const ShoppingBag = () => {
  const totalCount = useAppSelector(
    (state) => state.reducer.cartShopSlice.totalCount,
  );
  const { isShoppingBagClick, onClickShoppingBag } = useAccount();

  const modalRootEl = document.getElementById('modal-root')!;
  return (
    <div onClick={() => onClickShoppingBag()} className={cl.shoppingbag}>
      <Button primary={true} btnType="shopping">
        <img loading="lazy" src={shoppingBagImg} alt="Иконка Корзины" />
        <p className={`${cl.summary} normal`}>
          <span>{totalCount}</span>
        </p>
      </Button>
      {isShoppingBagClick &&
        ReactDOM.createPortal(<ShopCartModal />, modalRootEl)}
    </div>
  );
};

export default ShoppingBag;
