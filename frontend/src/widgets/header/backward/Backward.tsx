'use client';
import React from 'react';

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
