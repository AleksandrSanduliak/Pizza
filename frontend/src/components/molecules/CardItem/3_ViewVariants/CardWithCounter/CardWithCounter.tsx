import React from 'react';

import cn from 'classnames';

import Counter from 'atoms/counter/Counter';
import CardItemMobileView from 'molecules/CardItem/2_Views/CardItemMobileView/CardItemMobileView';
import { useCardContext } from 'molecules/CardItem/CompoundItemContext';

import cl from './CardWithCounter.module.scss';

const FooterSlot = () => {
  const { foodItem } = useCardContext();
  return (
    <div className={cl.footerSlot}>
      <Counter value={foodItem?.count} id={foodItem.id} />
      <p className={cn('subtitle2', cl.price)}>{foodItem.totalPrice} ₽</p>
    </div>
  );
};

const CardWithCounter = () => {
  return (
    <div>
      <CardItemMobileView footerSlot={<FooterSlot />} />
    </div>
  );
};

export default CardWithCounter;
