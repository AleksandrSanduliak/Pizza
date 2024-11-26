import React from 'react';

const useCabinetClick = () => {
  const [isOpenMenu, setIsOpenMenu] = React.useState<boolean>(false);

  const accountWrapper = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const onClickCabinet = (e: MouseEvent): void => {
      if (accountWrapper?.current?.contains(e.target as HTMLElement)) return;

      setIsOpenMenu(false);
    };

    document.addEventListener('click', onClickCabinet);
    return () => document.removeEventListener('click', onClickCabinet);
  }, []);
  return {
    isOpenMenu,
    setIsOpenMenu,
    accountWrapper,
  };
};

export default useCabinetClick;
