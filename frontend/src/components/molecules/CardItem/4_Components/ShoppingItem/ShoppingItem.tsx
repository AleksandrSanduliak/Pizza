import CardWithCounter from 'molecules/CardItem/3_ViewVariants/CardWithCounter/CardWithCounter';
import { CardContext } from 'molecules/CardItem/CompoundItemContext';
import { TFoodItem } from 'utils/types/types';

const ShoppingItem = ({ foodItem }: { foodItem: TFoodItem }) => {
  const contextValue = {
    foodItem,
    // isShowModal,
    // handleOpenModal,
    // handleCloseModal,
    // addToCart: addToCart,
  };
  return (
    <div>
      <CardContext.Provider value={contextValue}>
        <CardWithCounter />
      </CardContext.Provider>
    </div>
  );
};

export default ShoppingItem;
