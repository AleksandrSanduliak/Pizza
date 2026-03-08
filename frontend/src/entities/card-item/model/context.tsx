'use client';

import { createContext, useContext } from 'react';

import { Product } from '@entities/city/model/city.schema';

interface ICardContext {
  product: Product;
}

export const CardContext = createContext<ICardContext>({} as ICardContext);

export const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error('useCardContext должен использоваться в CardProvider');

  return context;
};
