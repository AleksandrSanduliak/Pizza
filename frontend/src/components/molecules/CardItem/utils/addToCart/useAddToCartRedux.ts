import React from 'react';

import useCardNotifications from 'molecules/CardItem/utils/useCardNotifications';
import { useSaveCardMutation } from 'store/api/orderApi';
import { addItem } from 'store/slices/cartSlice';
import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';
import { TFoodItem } from 'utils/types/types';

const addItemDTO = (foodItem: TFoodItem) => {
  return {
    id: foodItem.id,
    category: foodItem.category,
    desc: foodItem.desc,
    title: foodItem.title,
    sizes: foodItem?.sizes && foodItem.sizes[1],
    // types: pizzaTypes?.[foodItem.types?.[0]] ?? null
    price: foodItem?.price[1] ?? foodItem?.price[0],
    imageUrl: foodItem.imageUrl,
    // nutrition_facts: {
    //   ...foodItem.nutrition_facts,
    //   weight: foodItem?.weightTypes?.[foodItem.types?.[0]]?.[foodItem.sizes?.[1]],
    // },
  };
};

const useAddToCartRedux = ({ foodItem }: { foodItem: TFoodItem }) => {
  const [saveCard, { isLoading, isError, isSuccess }] = useSaveCardMutation();
  const dispatch = useAppDispatch();
  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);

  useCardNotifications({
    isLoading,
    isError,
    isSuccess,
    foodItem: foodItem,
  });

  const AddToCartRedux = (e: React.MouseEvent<Element, MouseEvent>, foodItem: TFoodItem) => {
    // e.stopPropagation();
    if (!isAuth) {
      dispatch(addItem(foodItem));
      NotificationFacade.toastSuccess({
        message: `Добавлено: ${foodItem.title as string}`,
      });
      return;
    }
    saveCard(addItemDTO(foodItem));
  };

  return AddToCartRedux;
};

export default useAddToCartRedux;
