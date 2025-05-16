import React from 'react';

import NotificationFacade from 'utils/funcs/facades/NotificationFacade';
import { TFoodItem } from 'utils/types/types';

interface ICardNotifications {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  foodItem: TFoodItem;
}

const useCardNotifications = ({ isLoading, isSuccess, isError, foodItem }: ICardNotifications) => {
  const toastId = React.useRef<string | number>(0);

  React.useEffect(() => {
    if (isLoading) {
      NotificationFacade.toastLoading({
        message: `Добавление товара ${foodItem.title} ...`,
        toastId,
      });
    }

    if (isSuccess && toastId.current) {
      NotificationFacade.toastSuccessPromise({
        message: `Добавлено: ${foodItem.title}`,
        toastId,
      });
    }

    if (isError && toastId.current) {
      NotificationFacade.toastErrorPromise({
        message: 'Ошибка, повторите попытку позже',
        toastId,
      });
    }
  }, [isLoading, isSuccess, isError, foodItem.title]);
};

export default useCardNotifications;
