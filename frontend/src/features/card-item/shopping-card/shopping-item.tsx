import { CardContext } from '@entities/card-item/model/context';
import CardWithCounter from '@features/card-item/shopping-card/CardWithCounter';
import { TFoodItem } from '@shared/utils/types/types';

const ShoppingItem = ({ foodItem }: { foodItem: TFoodItem }) => {
  const contextValue = {
    foodItem,
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
