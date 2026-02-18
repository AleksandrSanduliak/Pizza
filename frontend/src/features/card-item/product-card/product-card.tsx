'use client';

import { CardContext } from '@entities/card-item/model/context';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import { TFoodItem } from '@shared/types/types';

// import useAddToCartRedux from './lib/addToCart/useAddToCartRedux';
import DesktopCard from './ui/DesktopCard/DesktopCard';
import DisabledCard from './ui/DisabledCard/CardItemDisabled';
import MobileCard from './ui/MobileCard/MobileCard';

const CardItem = ({ product }: { product: TFoodItem }) => {
  const isMobile = useMediaQuery();
  // const addToCartRedux = useAddToCartRedux({ product });

  const contextValue = {
    product,
    // addToCart: addToCartRedux,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {product?.disabled && <DisabledCard />}
      {isMobile ? <MobileCard /> : <DesktopCard />}
    </CardContext.Provider>
  );
};

export default CardItem;
