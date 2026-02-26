'use client';
import clsx from 'classnames';

import CardItem from '@features/card-item/product-card/product-card';
import withHandleVisibility from '@shared/hoc/withHandleVisibility';
import { TFoodCategoryInfo } from '@shared/types/types';
import HeaderNavigation from '@widgets/card-sections/header-navigation/header-navigation';

import styles from './card-sections.module.scss';

const Card = ({ categoryData }: { categoryData: TFoodCategoryInfo }) => {
  const { category, categoryTitle, products } = categoryData;
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
const EnchantedHeaderNavigation = withHandleVisibility(HeaderNavigation);
const CardBlock = ({ data }) => {
  return (
    <>
      <EnchantedHeaderNavigation data={data} />
      <section>
        <div className="cardBlock__container">
          <div className={styles.cards}>
            {data?.length >= 1 &&
              data?.map((categoryData) => (
                <Card key={categoryData.category} categoryData={categoryData} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default CardBlock;
