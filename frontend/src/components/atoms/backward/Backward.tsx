import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from 'utils/hooks/redux';
import useAccount from 'utils/hooks/useAccount';
import cl from './backward.module.scss';

const Backward = () => {
  const { isAccountClick, isRegisterClick, onClickAuth } = useAccount();
  const actualLocation = useAppSelector(
    (state) => state.reducer.userCity.currentCity,
  );
  const location = useLocation();
  const navigate = useNavigate();

  const [isShow, setIsShow] = React.useState<boolean>(false);
  const currentLocation = location.pathname.replace(/\//g, '');

  React.useEffect(() => {
    if (
      isAccountClick ||
      isRegisterClick ||
      currentLocation !== actualLocation
    ) {
      setIsShow(true);
      return;
    }

    setIsShow(false);
  }, [
    actualLocation,
    currentLocation,
    isAccountClick,
    isRegisterClick,
    location.pathname,
  ]);

  const onClickBackward = () => {
    if (isAccountClick) onClickAuth();
    if (isRegisterClick) onClickAuth();
    if (location.pathname !== '/') navigate(-1);
    return;
  };

  return (
    <>
      {isShow && (
        <div className={cl.wrapper} onClick={onClickBackward}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.4166 24C17.1395 24 16.8622 23.8934 16.6507 23.6804L5.81748 12.7713C5.39417 
              12.345 5.39417 11.6548 5.81748 11.2288L16.6507 0.319704C17.074 -0.106568 17.7595 -0.106568 
              18.1825 0.319704C18.6056 0.745975 18.6058 1.43625 18.1825 1.86224L8.11521 12L18.1825 22.1378C18.6058 
              22.5641 18.6058 23.2544 18.1825 23.6804C17.971 23.8934 17.6937 24 17.4166 24Z"
              fill="#FF7010"
            />
          </svg>
        </div>
      )}
    </>
  );
};

export default Backward;
