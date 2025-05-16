import React from 'react';

// import { Button } from 'atoms/Buttons/Button';
import { toast } from 'react-toastify';

import SuccesDelivery from 'assets/imgs/order/succesDelivery.webp';
import Loader from 'atoms/loader/Loader';
import OrderForm from 'molecules/forms/orderForm/OrderForm';
import PromoCode from 'molecules/promoCode/PromoCode';
// import ShoppingItem from 'molecules/shoppingItem/ShoppingItem1';
import OrderSwiper from 'molecules/swipers/orderSwiper/OrderSwiper';
import { useGetPromoMutation, useSaveOrderMutation } from 'store/api/orderApi';
import { orderFood, orderSauces } from 'utils/data/orderItems';
import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import { useAppSelector } from 'utils/hooks/redux';

import cl from './order.module.scss';

const Order = () => {
  const { totalPrice, discountPrice } = useAppSelector((state) => state.reducer.cartShopSlice);
  const orderId = useAppSelector((state) => state.reducer.cartShopSlice.orderId);
  // console.log('orderId', orderId);
  // console.log('totalPrice', typeof totalPrice);
  const items = useAppSelector((state) => state.reducer.cartShopSlice.items);
  const [saveOrder, { data, isLoading, isError, error, isSuccess }] = useSaveOrderMutation();
  const [state, setState] = React.useState(true);
  if (isLoading) {
    window.scrollTo(0, 0);
    return (
      <div className={cl.loaderWrapper}>
        <Loader type="static" />
      </div>
    );
  }

  if (isError) {
    NotificationFacade.toastError({
      message: 'Ошибка! Перезагрузите страницу или повторите попытку позже',
    });
  }
  if (isSuccess) {
    console.log('isSucces', isSuccess);
    window.scrollTo(0, 0);
    return (
      <div className={cl.succesBlock}>
        <img src={SuccesDelivery} alt="Заказ принят" width="220px" height="135" />
        <h2>Заказ №{orderId} принят</h2>
        <div className={`normal ${cl.succesText}`}>
          Спасибо за заказ! <br />
          Примерное время доставки 45 минут. <br />
          Статус отследить можно нажав на кнопку ниже <br />
        </div>
        {/* <Button>Отследить заказ</Button> */}
      </div>
    );
  }
  return (
    <div className="order">
      <div className="order__container">
        <h1 className="h1">Ваш заказ</h1>

        <ul className={cl.orderList}>
          {items.map((el) => {
            return <ShoppingItem variant="order" key={el?.title} data={el} />;
          })}
        </ul>
        <div className={cl.priceBlock}>
          <PromoCode />
          <div className={cl.calcPrice}>
            <p className="h4 priceActual">Итого: {totalPrice} ₽</p>
            {discountPrice > 0 && (
              <p className={`mini priceOld ${cl.oldprice}`}>Итого: {discountPrice} ₽</p>
            )}
          </div>
        </div>
        <div>
          <h3 className="h3">Добавить к заказу?</h3>
          <OrderSwiper array={orderFood} />
          <h3 className="h3">Соусы</h3>
          <OrderSwiper array={orderSauces} />
        </div>
        <div>
          <h3>О вас</h3>
          <OrderForm saveOrder={saveOrder} />
        </div>
      </div>
    </div>
  );
};

export default Order;
