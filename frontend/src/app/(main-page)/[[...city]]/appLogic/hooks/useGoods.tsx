import React from 'react';

import { useUserLocationContext } from 'app/providers/LocationProvider';
import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';
import { useLazyGetGoodsQuery } from 'store/api/goodsApi';

const useGoods = () => {
  const [getGoods, { isLoading }] = useLazyGetGoodsQuery();

  const { userLocation } = useUserLocationContext();
  React.useEffect(() => {
    getGoods();
  }, [getGoods, userLocation]);
  if (isLoading) return <FullScreenLoader />;
  return null;
};

export default useGoods;
