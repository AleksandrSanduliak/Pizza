import clsx from 'classnames';

import { Categories, Category } from '@entities/city/model/city.schema';
import CardItem from '@features/card-item/product-card/product-card';
import CardSectionsNavigation from '@widgets/card-sections/card-sections-navigation/card-sections-navigation';

import styles from './card-sections.module.scss';

const Card = ({ categoryData }: { categoryData: Category }) => {
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

const CardBlock = ({ data }: { data: Categories }) => {
  return (
    <>
      <div>
        <CardSectionsNavigation data={data} />
      </div>
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
