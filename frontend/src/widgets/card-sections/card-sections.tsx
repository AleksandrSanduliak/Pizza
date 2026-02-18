'use client';
import clsx from 'classnames';

import CardItem from '@features/card-item/product-card/product-card';
import { useAppSelector } from '@shared/lib/store/hooks';
import { TFoodCategoryInfo, TGoodsData } from '@shared/types/types';
import { useGoods } from '@widgets/card-sections/useGoods';

import styles from './card-sections.module.scss';

const Card = ({ categoryData }: { categoryData: TFoodCategoryInfo }) => {
  const { category, categoryTitle, products } = categoryData;
  console.log('CardItems', products);
  return (
    <div key={category} className={styles.card}>
      <h1 id={category} className={clsx('h1', styles.title)}>
        {categoryTitle}
      </h1>
      {products.map((product) => (
        <CardItem key={product.title} product={product} />
      ))}
    </div>
  );
};

const CardBlock = () => {
  const { data } = useGoods();
  // const goods = useAppSelector((state) => state.reducer.goods.goods) as TGoodsData;
  console.log('data', data);
  return (
    <section>
      <div className="cardBlock__container">
        <div className={styles.cards}>
          {data?.categories?.length >= 1 &&
            data?.categories?.map((categoryData) => (
              <Card key={categoryData.category} categoryData={categoryData} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default CardBlock;
