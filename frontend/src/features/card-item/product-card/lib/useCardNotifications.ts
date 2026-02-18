import React from 'react';

import NotificationFacade from '@shared/funcs/facades/NotificationFacade';

interface ICardNotifications {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  product: any;
}

const useCardNotifications = ({ isLoading, isSuccess, isError, product }: ICardNotifications) => {
  const toastId = React.useRef<string | number>(0);

  React.useEffect(() => {
    if (isLoading) {
      NotificationFacade.toastLoading({
        message: `Добавление товара ${product.title} ...`,
        toastId,
      });
    }

    if (isSuccess && toastId.current) {
      NotificationFacade.toastSuccessPromise({
        message: `Добавлено: ${product.title}`,
        toastId,
      });
    }

    if (isError && toastId.current) {
      NotificationFacade.toastErrorPromise({
        message: 'Ошибка, повторите попытку позже',
        toastId,
      });
    }
  }, [isLoading, isSuccess, isError, product.title]);
};

export default useCardNotifications;
