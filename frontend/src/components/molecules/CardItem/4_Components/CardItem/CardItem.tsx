import useAddToCartRedux from 'molecules/CardItem/utils/addToCart/useAddToCartRedux';
import useMediaQuery from 'utils/hooks/ui/useMediaQuery';
import { TFoodItem } from 'utils/types/types';

import DesktopCard from '../../3_ViewVariants/CardWithModal/DesktopCard/DesktopCard';
import MobileCard from '../../3_ViewVariants/CardWithModal/MobileCard/MobileCard';
import DisabledCard from '../../3_ViewVariants/DisabledCard/CardItemDisabled';
import { CardContext } from '../../CompoundItemContext';

const CardItem = ({ foodItem }: { foodItem: TFoodItem }) => {
  const isMobile = useMediaQuery();
  const addToCartRedux = useAddToCartRedux({ foodItem });

  const contextValue = {
    foodItem,
    addToCart: addToCartRedux,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {foodItem?.disabled && <DisabledCard />}
      {isMobile ? <MobileCard /> : <DesktopCard />}
    </CardContext.Provider>
  );
};

export default CardItem;
