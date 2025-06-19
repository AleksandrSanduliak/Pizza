import React from 'react';

import FullScreenLoader from 'atoms/Loaders/FullScreenLoader/FullScreenLoader';
import { useLazyRefreshTokenQuery } from 'store/api/authApi';
import { getCookie } from 'utils/funcs/cookie';

const useAuthUser = () => {
  const [refreshToken, { isLoading: isLoadRefreshToken }] = useLazyRefreshTokenQuery();
  React.useEffect(() => {
    const accessToken = getCookie('accessToken');

    if (!accessToken) return;
    refreshToken();
  }, [refreshToken]);

  if (isLoadRefreshToken) return <FullScreenLoader />;
  return null;
};

export default useAuthUser;
