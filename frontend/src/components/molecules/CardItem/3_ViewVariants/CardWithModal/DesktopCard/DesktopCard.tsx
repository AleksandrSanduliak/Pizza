import BaseButton from 'atoms/Buttons/BaseButton';
import CardItemDesktopView from 'molecules/CardItem/2_Views/CardItemDesktopView/CardItemDesktopView';
import { useCardContext } from 'molecules/CardItem/CompoundItemContext';

import cl from './DesktopCard.module.scss';
import CardItemHeader from '../common/CardItemHeader';
import useCardModal from '../common/useCardModal';

const CardItemFooter = () => {
  const { foodItem } = useCardContext();
  // addToCart;
  return (
    <>
      <BaseButton
        buttonMode="primary"
        type="submit"
        className={cl.button}
        // onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => addToCart(e, foodItem)}
      >
        Выбрать
      </BaseButton>
      <div>
        <p className="subtitle priceActual">от {foodItem.price?.[1] ?? foodItem.price} ₽</p>
        {foodItem.oldprice && <p className="subtitle priceOld">{foodItem.oldprice} ₽</p>}
      </div>
    </>
  );
};

const DesktopCard = () => {
  const { isShowModal, handleCloseModal, handleOpenModal } = useCardModal();
  return (
    <CardItemDesktopView
      headerSlot={<CardItemHeader isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
      footerSlot={<CardItemFooter />}
      onClick={handleOpenModal}
    />
  );
};

export default DesktopCard;
