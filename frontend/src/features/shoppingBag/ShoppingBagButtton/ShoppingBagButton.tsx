'use client';
import cn from 'clsx';
import { ShoppingCart } from 'lucide-react';

import { Button } from '@shared/ui/button/button';

import cl from './ShoppingBagButton.module.scss';

const ShoppingBagButton = () => {
  return (
    <Button className={cl.shoppingBagButton} type="submit">
      <ShoppingCart color="white" strokeWidth="3px" />
      <p className={cn('normal', cl.summary)}>
        <span>0</span>
      </p>
    </Button>
  );
};

export default ShoppingBagButton;
