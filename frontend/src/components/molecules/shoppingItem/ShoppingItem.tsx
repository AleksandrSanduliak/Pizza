import React from 'react';
import cl from './shoppingitem.module.scss';
import { pizzaItem } from 'utils/types/types';
import Label from 'atoms/label/Label';
import Counter from 'atoms/counter/Counter';
import crosshair from 'assets/icons/cart-cross.svg';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';
import { removeItem } from 'store/slices/cartSlice';
import { useDeleteCardItemMutation } from 'store/api/orderApi';
const ShoppingItem = ({
  data,
  variant = 'card',
}: {
  data: pizzaItem;
  variant?: 'card' | 'order';
}) => {
  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);
  const [
    deleteItem,
    {
      incrementData,
      incrementIsLoading,
      incrementIsError,
      incrementError,
      incrementIsSuccess,
    },
  ] = useDeleteCardItemMutation();
  const dispatch = useAppDispatch();
  const variantsList = {
    card: cl.card,
    order: cl.order,
  };

  const deleteCardItem = () => {
    if (!isAuth) dispatch(removeItem(data.id));
    deleteItem({ id: data.id });
  };

  return (
    <li className={cl.wrapper}>
      <div className={cl.inner}>
        <div className={cl.img}>
          <img
            width="100px"
            height="100px"
            src={data.imageUrl}
            alt={`Фото пиццы ${data.title}`}
          />
        </div>

        <div className={`${cl.content} ${variantsList[variant]}`}>
          <div className={`${cl.text} ${variant === 'order' && cl.orderText}`}>
            <p className={`subtitle2 ${cl.title}`}>{data.title}</p>
            <p className="normal">{data.title}</p>
          </div>
          <div className={cl.money}>
            <Counter value={data?.count} id={data.id} />
            <p
              className={`subtitle2 ${cl.price} ${
                variant === 'order' && cl.orderPrice
              }`}>
              {data.totalPrice} ₽
            </p>
          </div>
        </div>
        <div onClick={deleteCardItem}>
          <img
            width="20px"
            height="20px"
            src={crosshair}
            alt="Кнопка удаления"
            className={cl.crosshair}
          />
        </div>
      </div>
    </li>
  );
};

export default ShoppingItem;
