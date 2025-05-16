import cn from 'classnames';

import BaseButton from 'atoms/Buttons/BaseButton';
import CardItemMobileView from 'molecules/CardItem/2_Views/CardItemMobileView/CardItemMobileView';
import { useCardContext } from 'molecules/CardItem/CompoundItemContext';

import cl from './MobileCard.module.scss';
import CardItemHeader from '../common/CardItemHeader';
import useCardModal from '../common/useCardModal';

const CardItemFooter = () => {
  const { foodItem } = useCardContext();
  // , addToCart
  return (
    <div className={cl.btnWrapper}>
      <BaseButton
        className={cl.cardBtn}
        buttonMode="secondary"
        type="submit"
        // onClick={(e: React.MouseEvent<Element, MouseEvent>): void => addToCart(e, foodItem)}
      >
        <p className="subtitle">от {foodItem?.price?.[1] ?? foodItem?.price} ₽</p>
      </BaseButton>
      {foodItem?.oldprice && (
        <p className={cn('subtitle', 'priceOld', cl.price)}>{foodItem?.oldprice} ₽</p>
      )}
    </div>
  );
};

const MobileCard = () => {
  const { isShowModal, handleCloseModal, handleOpenModal } = useCardModal();

  return (
    <CardItemMobileView
      headerSlot={<CardItemHeader isShowModal={isShowModal} handleCloseModal={handleCloseModal} />}
      footerSlot={<CardItemFooter />}
      onClick={handleOpenModal}
    />
  );
};

export default MobileCard;
