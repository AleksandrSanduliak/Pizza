'use client';
import React from 'react';

import { useUserData } from '@entities/user/use-user-data';
import useUpdateAuthStore from '@widgets/user-menu/user-menu/use-update-auth-store';
import UserMenuInner from '@widgets/user-menu/user-menu/user-menu-inner';
import UserMenuSkeleton from '@widgets/user-menu/user-menu/user-menu-skeleton';

const UserMenu = () => {
  const { data: userData, isPending, isFetching } = useUserData();
  useUpdateAuthStore({ userData });
  console.log('userData', userData);
  if (isPending || isFetching) return <UserMenuSkeleton />;
  return <UserMenuInner />;
};

export default UserMenu;
