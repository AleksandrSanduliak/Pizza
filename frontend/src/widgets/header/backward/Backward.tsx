'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

import { useUserLocationContext } from '@app/providers/LocationProvider';
import useUserMenu from '@entities/user-menu/useUserMenu';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import orangeArrow from 'public/icons/orange-arrow.svg';

import cl from './backward.module.scss';

const BackwardButton = ({ onClick }: { onClick: () => void }) => {
  console.log('orangeArrow.src', orangeArrow.src);
  return (
    <div className={cl.wrapper} onClick={onClick}>
      <img src={orangeArrow.src} loading="lazy" alt="Кнопка обратного возврата" />
    </div>
  );
};

const createBackwardStrategy = (
  isAccountClick: boolean,
  isRegisterClick: boolean,
  isUrlMainPage: boolean,
  onClickAuth: () => void,
  router: any,
) => {
  const backwardStrategies = {
    account: () => {
      if (isAccountClick) {
        onClickAuth();
      }
    },
    register: () => {
      if (isRegisterClick) {
        onClickAuth();
      }
    },

    backwardNavigate: () => {
      if (!isUrlMainPage) router.back();
    },
  };

  const onClickBackward = () => {
    Object.values(backwardStrategies).forEach((strategy) => strategy());
  };

  return onClickBackward;
};

const Backward = () => {
  // const [isShow, setIsShow] = React.useState<boolean>(false);

  // const { isAccountClick, isRegisterClick, onClickAuth } = useUserMenu();
  // const isMobile = useMediaQuery();
  // const router = useRouter();

  // const { isUrlMainPage, userLocation } = useUserLocationContext();

  // const strategy = createBackwardStrategy(
  //   isAccountClick,
  //   isRegisterClick,
  //   isUrlMainPage,
  //   onClickAuth,
  //   router,
  // );

  // React.useEffect(() => {
  //   if ((isMobile && isAccountClick) || (isMobile && isRegisterClick)) {
  //     setIsShow(true);
  //     return;
  //   }

  //   setIsShow(false);
  // }, [userLocation, isAccountClick, isMobile, isRegisterClick]);

  return <BackwardButton />;
};

export default Backward;
