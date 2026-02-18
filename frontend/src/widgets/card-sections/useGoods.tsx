// import React from 'react';

// import { useUserLocationContext } from '@app/providers/LocationProvider';
// import { useLazyGetGoodsQuery } from '@shared/lib/store/api/goodsApi';
// import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

// const useGoods = () => {
//   const [getGoods, { isLoading }] = useLazyGetGoodsQuery();

//   const { userLocation } = useUserLocationContext();
//   React.useEffect(() => {
//     getGoods();
//   }, [getGoods, userLocation]);
//   if (isLoading) return <FullScreenLoader />;
//   return null;
// };

// export default useGoods;
// //

// hooks/useGoods.ts
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { goodsApiUrl } from '@shared/consts/api-list';
import { setGoods } from '@widgets/card-sections/goodsSlice';
import { axiosInstance } from '@shared/consts/axios';
import { useAppDispatch } from '@shared/store/hooks';
import { TGoodsData } from '@shared/types/types';

// Ключ для кэширования
export const goodsKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsKeys.all, 'list'] as const,
  details: () => [...goodsKeys.all, 'detail'] as const,
};

// Базовый хук для получения товаров
export const useGoods = (options?: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: goodsKeys.lists(),
    queryFn: async () => {
      const response = await axiosInstance.get<TGoodsData>(`${goodsApiUrl}/getGoods`);
      return response.data;
    },
    enabled: options?.enabled ?? true,
    onSuccess: (data) => {
      // Диспатчим в Redux если нужно
      dispatch(setGoods(data));
    },
    onError: (error) => {
      console.log('Error fetching goods:', error);
    },
  });
};

// Хук для ленивой загрузки (как useLazyGetGoodsQuery)
export const useLazyGoods = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  const fetchGoods = async () => {
    try {
      const response = await axiosInstance.get<TGoodsData>(`${goodsApiUrl}/getGoods`);
      dispatch(setGoods(response.data));
      return response.data;
    } catch (error) {
      console.log('Error fetching goods:', error);
      throw error;
    }
  };

  return [
    fetchGoods,
    {
      isLoading: false, // Можно добавить состояние загрузки если нужно
      error: null,
    },
  ] as const;
};
