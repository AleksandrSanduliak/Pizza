'use client';

import { CardContext } from '@entities/card-item/model/context';
import { Category, Product, Product } from '@entities/city/model/city.schema';
import useMediaQuery from '@shared/hooks/ui/useMediaQuery';
import { TFoodItem } from '@shared/types/types';

// import useAddToCartRedux from './lib/addToCart/useAddToCartRedux';
import DesktopCard from './ui/DesktopCard/DesktopCard';
import DisabledCard from './ui/DisabledCard/CardItemDisabled';
import MobileCard from './ui/MobileCard/MobileCard';

const CardItem = ({ product }: { product: Product }) => {
  const isMobile = useMediaQuery();

  const contextValue = {
    product,
  };

  return (
    <CardContext.Provider value={contextValue}>
      {product?.disabled && <DisabledCard />}
      {isMobile ? <MobileCard /> : <DesktopCard />}
    </CardContext.Provider>
  );
};

export default CardItem;
