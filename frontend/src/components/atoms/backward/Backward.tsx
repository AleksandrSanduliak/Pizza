import backwardImg from 'assets/icons/orange-arrow.svg';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks/redux';
import useAccount from 'utils/hooks/useAccount';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import useUserLocation from 'utils/hooks/useUserLocation';
import cl from './backward.module.scss';

const Backward = () => {
  const isMobile = useMediaQuery();
  const { isAccountClick, isRegisterClick, onClickAuth } = useAccount();
  const actualLocation = useAppSelector(
    (state) => state.reducer.userCity.currentCity,
  );
  const { isUrlMainPage } = useUserLocation();
  const navigate = useNavigate();

  const [isShow, setIsShow] = React.useState<boolean>(false);

  const onClickBackward = () => {
    if (isAccountClick || isRegisterClick) onClickAuth();
    if (!isUrlMainPage) navigate(-1);
  };

  React.useEffect(() => {
    if ((isMobile && isAccountClick) || (isMobile && isRegisterClick)) {
      setIsShow(true);
      return;
    }

    setIsShow(false);
  }, [actualLocation, isAccountClick, isMobile, isRegisterClick]);

  return (
    <>
      {isShow && (
        <div className={cl.wrapper} onClick={onClickBackward}>
          <img
            src={backwardImg}
            loading="lazy"
            alt="Кнопка обратного возврата"
          />
        </div>
      )}
    </>
  );
};

export default Backward;
