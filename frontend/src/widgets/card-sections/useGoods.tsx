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
import axios from 'axios';

import { goodsApiUrl } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';
import { useAppDispatch } from '@shared/store/hooks';
import { TGoodsData } from '@shared/types/types';
import { setGoods } from '@widgets/card-sections/goodsSlice';

// Ключ для кэширования
export const goodsKeys = {
  all: ['goods'] as const,
  lists: () => [...goodsKeys.all, 'list'] as const,
  details: () => [...goodsKeys.all, 'detail'] as const,
};

export const getGoods = async () => {
  try {
    const response = await axios.get<TGoodsData>(`${goodsApiUrl}/getGoods`, {
      withCredentials: false,
    });
    console.log('response');
    return response.data;
  } catch (e) {
    console.log('e', e);
  }
};
// Базовый хук для получения товаров
export const useGoods = (options?: { enabled?: boolean }) => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: goodsKeys.lists(),
    queryFn: async () => getGoods(),
    enabled: options?.enabled ?? true,
    onSuccess: (data) => {
      dispatch(setGoods(data));
    },
    onError: (error) => {
      console.log('Error fetching goods:', error);
    },
  });
};
