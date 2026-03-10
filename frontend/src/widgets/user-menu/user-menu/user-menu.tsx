'use client';
import React from 'react';

import { useUserData } from '@entities/user/use-user-data';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import UserMenuInner from '@widgets/user-menu/user-menu/user-menu-inner';
import UserMenuSkeleton from '@widgets/user-menu/user-menu/user-menu-skeleton';

const UserMenu = () => {
  const isMobile = useMediaQuery(768.98);
  const { isPending, isFetching } = useUserData();
  console.log('isMobile', isMobile);
  console.log('isPending', isPending);

  if (isMobile) return null;
  if (isPending || isFetching) return <UserMenuSkeleton />;

  return <UserMenuInner />;
};

export default UserMenu;
