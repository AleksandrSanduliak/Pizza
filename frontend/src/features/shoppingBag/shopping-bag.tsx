'use client';

import { navigate } from 'next/dist/client/components/segment-cache/navigation';
import Image from 'next/image';
import { toast } from 'sonner';

import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import { ShoppingItem } from '@features/card-item';
import ShoppingBagButton from '@features/shoppingBag/ShoppingBagButtton/ShoppingBagButton';
import ShopCartModal from '@features/shoppingBag/ShoppingCartModal/ShopCartModal';
import { useAppSelector } from '@shared/store/hooks';
import { Button } from '@shared/ui/button/button';
import {
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
  Drawer,
} from '@shared/ui/drawer';
import { cn } from '@shared/utils/shadcn-utils';
import emptyCard from 'public/icons/empty-card.svg';

import cl from './shopping-bag.module.scss';

const EmptyCardContend = () => {
  return (
    <div className={cl.empty}>
      <Image width={306} height={120} loading="lazy" alt="Корзина пуста" src={emptyCard} />
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
  // const items = useAppSelector((state) => state.reducer.cartShopSlice.items);
  // const items = [''];
  return (
    <div className={cl.pizzas}>
      <ul>
        {/* {items?.length &&
          items.map((item) => {
            return <ShoppingItem key={item.title} foodItem={item} />;
          })} */}
      </ul>
    </div>
  );
};

const ShoppingResuls = () => {
  // const handleMakeOrder = () => {
  //   if (!isAuth) {
  //     isMobile ? setAuthForMobile() : setAuthForDesktop();
  //     toast.info('Войдите в аккаунт, чтобы сделать заказ', {
  //       position: 'top-right',
  //       autoClose: 3000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //       theme: 'light',
  //     });
  //     return;
  //   }
  //   navigate('/order');
  //   onClickShoppingBag();
  // };

  // const totalPrice = useAppSelector((state) => state.reducer.cartShopSlice.totalPrice);

  return (
    <div className={cl.results}>
      <p className="h4">Итого: 0₽</p>
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
  // const items = useAppSelector((state) => state.reducer.cartShopSlice.items);

  return (
    <div className={cl.content}>
      <ShoppingCard /> <EmptyCardContend />
    </div>
  );
};

const ShoppingBag = () => {
  const modalRootEl = document.getElementById('modal-root')!;
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  const isBasketClicked = useAppSelector((state) => userMenuSlice.selectors.isBasketClicked(state));

  return (
    <Drawer direction="right">
      <DrawerTrigger>
        <ShoppingBagButton />
      </DrawerTrigger>
      <DrawerContent className="bg-white">
        <DrawerHeader className="sr-only">
          <DrawerTitle>Корзина товаров</DrawerTitle>
        </DrawerHeader>
        <ModalContent />
        <DrawerFooter>
          <Button>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
export default ShoppingBag;
