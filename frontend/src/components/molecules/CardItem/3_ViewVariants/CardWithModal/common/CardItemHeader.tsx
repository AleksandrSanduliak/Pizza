import Label from 'atoms/Label/Label';
import CardItemModal from 'molecules/CardItem/3_ViewVariants/CardWithModal/common/CardItemModal/CardItemModal';
import { useCardContext } from 'molecules/CardItem/CompoundItemContext';

import { ICardItemHeader } from '../../CardVariant';

const CardItemHeader = ({ isShowModal, handleCloseModal }: ICardItemHeader) => {
  const { foodItem } = useCardContext();

  return (
    <>
      {isShowModal && (
        <CardItemModal foodItem={foodItem} isShowModal={isShowModal} onClose={handleCloseModal} />
      )}
      {typeof foodItem?.labeltype === 'number' && <Label labelType={foodItem.labeltype} />}
    </>
  );
};

export default CardItemHeader;
