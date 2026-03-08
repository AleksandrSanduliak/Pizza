'use client';
import React from 'react';

import { useSaveCardMutation } from '@app/(main-page)/[city]/(order)/order/orderApi';
import { addItem } from '@entities/basket/cartSlice';
import { selectIsAuth } from '@features/auth/auth.slice';
import useCardNotifications from '@features/card-item/product-card/lib/useCardNotifications';
import NotificationFacade from '@shared/funcs/facades/NotificationFacade';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';

const addItemDTO = (product) => {
  return {
    id: product.id,
    category: product.category,
    desc: product.desc,
    title: product.title,
    sizes: product?.sizes && product.sizes[1],
    // types: pizzaTypes?.[product.types?.[0]] ?? null
    price: product?.price[1] ?? product?.price[0],
    imageUrl: product.imageUrl,
    // nutrition_facts: {
    //   ...product.nutrition_facts,
    //   weight: product?.weightTypes?.[product.types?.[0]]?.[product.sizes?.[1]],
    // },
  };
};

const useAddToCartRedux = ({ product }: { product: any }) => {
  const [saveCard, { isLoading, isError, isSuccess }] = useSaveCardMutation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector(selectIsAuth);

  useCardNotifications({
    isLoading,
    isError,
    isSuccess,
    product: product,
  });

  const AddToCartRedux = (e: React.MouseEvent<Element, MouseEvent>, product: Tproduct) => {
    // e.stopPropagation();
    if (!isAuth) {
      dispatch(addItem(product));
      NotificationFacade.toastSuccess({
        message: `Добавлено: ${product.title as string}`,
      });
      return;
    }
    saveCard(addItemDTO(product));
  };

  return AddToCartRedux;
};

export default useAddToCartRedux;
