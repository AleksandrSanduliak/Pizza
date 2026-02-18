import cn from 'classnames';
import React from 'react';

import { useCardContext } from '@entities/card-item/model/context';
import CardItemMobileView from '@entities/card-item/ui/views/CardItemMobileView/CardItemMobileView';
import Counter from '@shared/ui/counter/Counter';

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
