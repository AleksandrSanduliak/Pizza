'use client';

import { createContext, useContext } from 'react';

import { TFoodItem } from '@shared/types/types';

interface ICardContext {
  product: TFoodItem;
}

export const CardContext = createContext<ICardContext>({} as ICardContext);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCardContext должен использоваться в CardProvider');

  return context;
};
