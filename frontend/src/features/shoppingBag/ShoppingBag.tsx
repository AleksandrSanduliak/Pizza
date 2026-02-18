'use client';

import ReactDOM from 'react-dom';

import ShoppingBagButton from '@features/shoppingBag/ShoppingBagButtton/ShoppingBagButton';
import ShopCartModal from '@features/shoppingBag/ShoppingCartModal/ShopCartModal';

import cl from './shoppingbag.module.scss';
import useUserMenu from '@entities/user-menu/useUserMenu';

const ShoppingBag = () => {
  const { isShoppingBagClick, onClickShoppingBag, isBurgerClick } = useUserMenu();
  const modalRootEl = document.getElementById('modal-root')!;
  return (
    <div onClick={() => onClickShoppingBag()} className={cl.shoppingbag}>
      {!isBurgerClick && <ShoppingBagButton />}
      {isShoppingBagClick && ReactDOM.createPortal(<ShopCartModal />, modalRootEl)}
    </div>
  );
};

export default ShoppingBag;
