'use client';
import cn from 'classnames';

import CardItem from 'molecules/CardItem/4_Components/CardItem/CardItem';
import { useAppSelector } from 'store/hooks';
import { TFoodCategoryInfo, TFoodItem, TGoodsData } from 'utils/types/types';

import cl from './CardBlock.module.scss';

const CardItems = ({ items }: { items: TFoodItem[] }) => {
  return items.map((food) => <CardItem key={food.title} foodItem={food} />);
};

const Card = ({ categoryInfo }: { categoryInfo: TFoodCategoryInfo }) => {
  const { name, anchor, title, items } = categoryInfo;

  return (
    <div key={name} className={cl.card}>
      <h1 id={anchor} className={cn('h1', cl.title)}>
        {title}
      </h1>
      <CardItems items={items} />
    </div>
  );
};

const CardBlock = () => {
  const goods = useAppSelector((state) => state.reducer.goods.goods) as TGoodsData;

  return (
    <section>
      <div className="cardBlock__container">
        <div className={cl.cards}>
          {goods.length >= 1 &&
            goods?.map((categoryInfo) => (
              <Card key={categoryInfo.title} categoryInfo={categoryInfo} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardBlock;
