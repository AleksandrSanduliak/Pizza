import React from 'react';

import { NavigateFunction, useNavigate } from 'react-router-dom';

import backwardImg from 'assets/icons/orange-arrow.svg';
import useUserLocation from 'utils/hooks/navigation/useUserLocation';
import { useAppSelector } from 'utils/hooks/redux';
import useAccount from 'utils/hooks/ui/useAccount';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';

import cl from './Backward.module.scss';

const BackwardButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className={cl.wrapper} onClick={onClick}>
      <img src={backwardImg} loading="lazy" alt="Кнопка обратного возврата" />
    </div>
  );
};

const createBackwardStrategy = (
  isAccountClick: boolean,
  isRegisterClick: boolean,
  isUrlMainPage: boolean,
  onClickAuth: () => void,
  navigate: NavigateFunction,
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
      if (!isUrlMainPage) navigate(-1);
    },
  };

  const onClickBackward = () => {
    Object.values(backwardStrategies).forEach((strategy) => strategy());
  };

  return onClickBackward;
};

const Backward = () => {
  const [isShow, setIsShow] = React.useState<boolean>(false);
  const actualLocation = useAppSelector((state) => state.reducer.userCity.currentCity);
  const { isAccountClick, isRegisterClick, onClickAuth } = useAccount();
  const isMobile = useMediaQuery();
  const navigate = useNavigate();
  const { isUrlMainPage } = useUserLocation();
  const strategy = createBackwardStrategy(
    isAccountClick,
    isRegisterClick,
    isUrlMainPage,
    onClickAuth,
    navigate,
  );

  React.useEffect(() => {
    if ((isMobile && isAccountClick) || (isMobile && isRegisterClick)) {
      setIsShow(true);
      return;
    }

    setIsShow(false);
  }, [actualLocation, isAccountClick, isMobile, isRegisterClick]);

  return isShow && <BackwardButton onClick={strategy} />;
};

export default Backward;
