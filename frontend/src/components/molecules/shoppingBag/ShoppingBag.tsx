'use client';
import ReactDOM from 'react-dom';

import ShoppingBagButton from 'atoms/Buttons/buttons/ShoppingBagButtton/ShoppingBagButton';
import ShopCartModal from 'molecules/modals/ShoppingCartModal/ShopCartModal';
import useAccount from 'utils/hooks/ui/useAccount';

import cl from './Shoppingbag.module.scss';

const ShoppingBag = () => {
  const { isShoppingBagClick, onClickShoppingBag, isBurgerClick } = useAccount();
  const modalRootEl = document.getElementById('modal-root')!;
  return (
    <div onClick={() => onClickShoppingBag()} className={cl.shoppingbag}>
      {!isBurgerClick && <ShoppingBagButton />}
      {isShoppingBagClick && ReactDOM.createPortal(<ShopCartModal />, modalRootEl)}
    </div>
  );
};

export default ShoppingBag;
