'use client';
import cn from 'classnames';
import { toast } from 'react-toastify';

import ShoppingItem from '@features/shoppingItem/ShoppingItem1';
import { useAppSelector } from '@shared/store/hooks';
import useUserMenu from '@entities/user-menu/useUserMenu';
import emptyCard from 'public/icons/emptyCard.svg';

// import AsideModal from '../../../shared/ui/modals/views/AsideModal/AsideModal';

import cl from './shopcartmodal.module.scss';

const EmptyCardContend = () => {
  return (
    <div className={cl.empty}>
      <img width="306px" height="120px" loading="lazy" alt="Корзина пуста" src={emptyCard} />
      <div className={cl.emptyText}>
        <h2 className="h3">Ой, пусто! </h2>
        <p className="normal">
          Ваша корзина пуста, откройте «Меню» и выберите понравившийся товар. Мы доставим ваш заказ
          от 549 ₽
        </p>
      </div>
    </div>
  );
};

const ShoppingItems = () => {
  const items = useAppSelector((state) => state.reducer.cartShopSlice.items);

  return (
    <div className={cl.pizzas}>
      <ul>
        {items?.length &&
          items.map((item) => {
            return <ShoppingItem key={item.title} foodItem={item} />;
          })}
      </ul>
    </div>
  );
};

const ShoppingResuls = () => {
  const handleMakeOrder = () => {
    if (!isAuth) {
      isMobile ? setAuthForMobile() : setAuthForDesktop();
      toast.info('Войдите в аккаунт, чтобы сделать заказ', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    navigate('/order');
    onClickShoppingBag();
  };

  const totalPrice = useAppSelector((state) => state.reducer.cartShopSlice.totalPrice);

  return (
    <div className={cl.results}>
      <p className="h4">Итого: {totalPrice} ₽</p>
      {/* <Button>Оформить заказ</Button> */}
    </div>
  );
};

const ShoppingCard = () => {
  return (
    <div className={cl.card}>
      <div className={cl.header}>
        <h1 className={cn('h1', cl.headerTitle)}>Ваш заказ</h1>
      </div>
      <ShoppingItems />
      <ShoppingResuls />
    </div>
  );
};

const ModalContent = () => {
  const items = useAppSelector((state) => state.reducer.cartShopSlice.items);

  return (
    <div className={cl.content}>{items.length >= 1 ? <ShoppingCard /> : <EmptyCardContend />}</div>
  );
};

const ShopCartModal = () => {
  const { onClickShoppingBag, isShoppingBagClick } = useUserMenu();

  // return (
  //   // isShoppingBagClick && (
  //   //   // <AsideModal onClick={() => onClickShoppingBag}>
  //   //   //   <ModalContent />
  //   //   // </AsideModal>
  //   // )
  // );
};

export default ShopCartModal;
