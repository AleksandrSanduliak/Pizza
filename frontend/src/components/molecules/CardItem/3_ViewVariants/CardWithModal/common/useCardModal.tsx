import React from 'react';

const useCardModal = () => {
  const [isShowModal, setIsShowModal] = React.useState<boolean>(false);
  const handleOpenModal = React.useCallback(() => setIsShowModal(true), []);
  const handleCloseModal = React.useCallback(() => setIsShowModal(false), []);

  return {
    isShowModal,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useCardModal;
