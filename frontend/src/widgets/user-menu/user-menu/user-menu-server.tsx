import React, { Suspense } from 'react';

import { getUserData } from '@entities/user/user.api';
import UserMenu from '@widgets/user-menu/user-menu/user-menu';

const UserMenuServer = async () => {
  const userData = await getUserData();
  console.log('userData', userData);
  return <UserMenu userData={userData} />;
};

export default UserMenuServer;
