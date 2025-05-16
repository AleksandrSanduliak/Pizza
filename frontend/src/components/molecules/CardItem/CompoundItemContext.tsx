import { createContext, useContext } from 'react';

import { TFoodItem } from 'utils/types/types';

import { TAddToCart } from './types';

interface ICardContext {
  foodItem: TFoodItem;
  addToCart: TAddToCart;
}

export const CardContext = createContext<ICardContext>({} as ICardContext);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCardContext должен использоваться в CardProvider');

  return context;
};
