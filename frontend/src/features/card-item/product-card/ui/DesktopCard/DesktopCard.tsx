import { useCardContext } from '@entities/card-item/model/context';
import CardItemDesktopView from '@entities/card-item/ui/views/CardItemDesktopView/CardItemDesktopView';
import { Button } from '@shared/ui/button/button';

import CardItemHeader from '../common/CardItemHeader';
import useCardModal from '../common/useCardModal';

import cl from './DesktopCard.module.scss';

const CardItemFooter = () => {
  const { product } = useCardContext();
  // addToCart;
  return (
    <>
      <Button
        type="submit"
        className={cl.button}
        // onClick={(e: React.MouseEvent<HTMLElement, MouseEvent>) => addToCart(e, product)}
      >
        Выбрать
      </Button>
      <div>
        <p className="subtitle priceActual">от {product.price?.[1] ?? product.price} ₽</p>
        {product.oldprice && <p className="subtitle priceOld">{product.oldprice} ₽</p>}
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
