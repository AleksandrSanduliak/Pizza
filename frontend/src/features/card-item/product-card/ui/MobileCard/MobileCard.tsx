import cn from 'classnames';

import { useCardContext } from '@entities/card-item/model/context';
import CardItemMobileView from '@entities/card-item/ui/views/CardItemMobileView/CardItemMobileView';
import { Button } from '@shared/ui/button/button';

import CardItemHeader from '../common/CardItemHeader';
import useCardModal from '../common/useCardModal';

import cl from './MobileCard.module.scss';

const CardItemFooter = () => {
  const { product } = useCardContext();
  // , addToCart
  return (
    <div className={cl.btnWrapper}>
      <Button
        className={cl.cardBtn}
        type="submit"
        // onClick={(e: React.MouseEvent<Element, MouseEvent>): void => addToCart(e, product)}
      >
        <p className="subtitle">от {product?.price?.[1] ?? product?.price} ₽</p>
      </Button>
      {product?.oldprice && (
        <p className={cn('subtitle', 'priceOld', cl.price)}>{product?.oldprice} ₽</p>
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
