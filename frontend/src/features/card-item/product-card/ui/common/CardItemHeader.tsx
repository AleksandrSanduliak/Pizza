import { useCardContext } from '@entities/card-item/model/context';
import CardItemModal from '@features/card-item/product-card/ui/common/CardItemModal/CardItemModal';
import { ICardItemHeader } from '@features/card-item/ui/3_ViewVariants/CardVariant';
import Label from '@shared/ui/label/Label';

const CardItemHeader = ({ isShowModal, handleCloseModal }: ICardItemHeader) => {
  const { product } = useCardContext();

  return (
    <>
      {isShowModal && (
        <CardItemModal foodItem={product} isShowModal={isShowModal} onClose={handleCloseModal} />
      )}
      {typeof product?.labeltype === 'number' && <Label labelType={product.labeltype} />}
    </>
  );
};

export default CardItemHeader;
