import React from 'react';

const useCabinetClick = () => {
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const accountWrapper = React.useRef<HTMLDivElement>(null);
  const clickAllowedInner = React.useRef<HTMLUListElement>(null);

  React.useEffect(() => {
    const onClickCabinet = (e: MouseEvent): void => {
      if (
        accountWrapper.current &&
        accountWrapper?.current?.contains(e?.target as HTMLElement)
      ) {
        setIsOpenMenu((prev) => !prev);
      }

      if (
        clickAllowedInner.current &&
        clickAllowedInner?.current?.contains(e?.target as HTMLElement)
      ) {
        setIsOpenMenu(true);
      }

      if (
        accountWrapper.current &&
        !accountWrapper?.current?.contains(e?.target as HTMLElement)
      ) {
        setIsOpenMenu(false);
      }
    };

    document.addEventListener('click', onClickCabinet);
    return () => document.removeEventListener('click', onClickCabinet);
  }, []);

  return {
    isOpenMenu,
    setIsOpenMenu,
    accountWrapper,
    clickAllowedInner,
  };
};

export default useCabinetClick;
