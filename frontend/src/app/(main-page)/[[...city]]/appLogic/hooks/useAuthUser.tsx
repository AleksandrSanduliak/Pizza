import React from 'react';

import { useRefreshToken } from '@features/auth/authApi';
import { getCookie } from '@shared/funcs/cookie';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

const useAuthUser = () => {
  // const refresh = useRefreshToken();
  // const [refreshToken, { isLoading: isLoadRefreshToken }] = useLazyRefreshTokenQuery();
  // React.useEffect(() => {
  //   const accessToken = getCookie('accessToken');

  //   if (!accessToken) return;
  //   refreshToken();
  // }, [refreshToken]);

  // if (isLoadRefreshToken) return <FullScreenLoader />;
  return null;
};

export default useAuthUser;
