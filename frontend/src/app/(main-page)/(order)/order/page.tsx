'use client';
import React from 'react';

// import Image from 'next/image';
// import { useSaveOrderMutation } from '@app/(order)/order/orderApi';
// import PromoCode from '@features/promoCode/PromoCode';
// import ShoppingItem from '@features/shoppingItem/ShoppingItem1';
// import NotificationFacade from '@shared/funcs/facades/NotificationFacade';
// import { useAppSelector } from '@shared/store/hooks';
// import Loader from '@shared/ui/Loaders/Loader/Loader';

// import SuccesDelivery from '/public/imgs/order/succesDelivery.webp';

// import cl from './order.module.scss';

const Order = () => {
  // const { totalPrice, discountPrice } = useAppSelector((state) => state.reducer.cartShopSlice);
  // const orderId = useAppSelector((state) => state.reducer.cartShopSlice.orderId);
  // // console.log('orderId', orderId);
  // // console.log('totalPrice', typeof totalPrice);
  // const items = useAppSelector((state) => state.reducer.cartShopSlice.items);
  // const [saveOrder, { data, isLoading, isError, error, isSuccess }] = useSaveOrderMutation();
  // const [state, setState] = React.useState(true);
  // if (isLoading) {
  //   window.scrollTo(0, 0);
  //   return (
  //     <div className={cl.loaderWrapper}>
  //       <Loader type="static" />
  //     </div>
  //   );
  // }

  // if (isError) {
  //   NotificationFacade.toastError({
  //     message: 'Ошибка! Перезагрузите страницу или повторите попытку позже',
  //   });
  // }
  // if (isSuccess) {
  //   // console.log('isSucces', isSuccess);
  //   window.scrollTo(0, 0);
  //   return (
  //     <div className={cl.succesBlock}>
  //       {/* <Image alt="Заказ принят" width={220} height={135} /> */}
  //       {/* <img src={SuccesDelivery} alt="Заказ принят" width="220px" height="135" /> */}

  //       <h2>Заказ №{orderId} принят</h2>
  //       <div className={`normal ${cl.succesText}`}>
  //         Спасибо за заказ! <br />
  //         Примерное время доставки 45 минут. <br />
  //         Статус отследить можно нажав на кнопку ниже <br />
  //       </div>
  //       {/* <Button>Отследить заказ</Button> */}
  //     </div>
  //   );
  // }
  return (
    <>order</>
    // <div className="order">
    //   <div className="order__container">
    //     <h1 className="h1">Ваш заказ</h1>

    //     <ul className={cl.orderList}>
    //       {items.map((el) => {
    //         return <ShoppingItem variant="order" key={el?.title} data={el} />;
    //       })}
    //     </ul>
    //     <div className={cl.priceBlock}>
    //       <PromoCode />
    //       <div className={cl.calcPrice}>
    //         <p className="h4 priceActual">Итого: {totalPrice} ₽</p>
    //         {discountPrice > 0 && (
    //           <p className={`mini priceOld ${cl.oldprice}`}>Итого: {discountPrice} ₽</p>
    //         )}
    //       </div>
    //     </div>
    //     <div>
    //       <h3 className="h3">Добавить к заказу?</h3>
    //       {/* <OrderSwiper array={orderFood} />
    //       <h3 className="h3">Соусы</h3>
    //       <OrderSwiper array={orderSauces} /> */}
    //     </div>
    //     <div>
    //       <h3>О вас</h3>
    //       {/* <OrderForm saveOrder={saveOrder} /> */}
    //     </div>
    //   </div>
    // </div>
  );
};

export default Order;
