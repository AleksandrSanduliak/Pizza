'use client';
import Image from 'next/image';

import { selectIsAuth } from '@features/auth/auth.slice';
import { useAppSelector } from '@shared/store/hooks';
import { AuthModal } from '@widgets/user-menu/user-menu/auth-modal';
import { UserCabinet } from '@widgets/user-menu/user-menu/user-cabinet';
import accoutImage from 'public/icons/isAccount.svg';

const UserMenuInner = () => {
  const isAuth = useAppSelector(selectIsAuth);
  console.log('isAuth', isAuth);
  return (
    <div className="flex items-center">
      <Image
        className="w-[1.25rem] h-[1.25rem] mr-[0.5rem]"
        loading="lazy"
        src={accoutImage}
        alt="Иконка Аккаунта"
      />
      {isAuth ? <UserCabinet /> : <AuthModal />}
    </div>
  );
};

export default UserMenuInner;
