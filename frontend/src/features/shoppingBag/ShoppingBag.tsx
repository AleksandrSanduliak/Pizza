'use client';

import ReactDOM from 'react-dom';

import useUserMenu from '@entities/user-menu/useUserMenu';
import ShoppingBagButton from '@features/shoppingBag/ShoppingBagButtton/ShoppingBagButton';
import ShopCartModal from '@features/shoppingBag/ShoppingCartModal/ShopCartModal';

import cl from './shoppingbag.module.scss';

const ShoppingBag = () => {
  // const { isShoppingBagClick, onClickShoppingBag, isBurgerClick } = useUserMenu();
  // const modalRootEl = document.getElementById('modal-root')!;
  return 123;
  // // <div onClick={() => onClickShoppingBag()} className={cl.shoppingbag}>
  //   {/* {!isBurgerClick && <ShoppingBagButton />}
  //   {isShoppingBagClick && ReactDOM.createPortal(<ShopCartModal />, modalRootEl)}
  // </div> */}
};

export default ShoppingBag;
