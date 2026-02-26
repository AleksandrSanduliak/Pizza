import React from 'react';

import { useRefreshToken } from '@features/auth/authApi';
import { getCookie } from '@shared/funcs/cookie';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

const useAuthUser = () => {
  const { refetch } = useRefreshToken();
  console.log('auth iser');
  // const [refreshToken, { isLoading: isLoadRefreshToken }] = useLazyRefreshTokenQuery();
  React.useEffect(() => {
    const accessToken = getCookie('accessToken');
    console.log('accessToken', accessToken);
    refetch();
    if (!accessToken) return;
    refetch();
  }, [refetch]);

  // if (isLoadRefreshToken) return <FullScreenLoader />;
  return null;
};

export default useAuthUser;
