import { Button } from 'atoms/button/Button';
import Loader from 'atoms/loader/Loader';
import CardItem from 'molecules/cardItem/CardItem';
import React from 'react';
import { useLazyGetGoodsQuery } from 'store/api/goodsApi';
import { selectorApp } from 'store/store';
import pizzas from 'utils/data/pizzas.json';
import cl from './cardBlock.module.scss';

const CardBlock = () => {
  const [getGoods, { data, isFetching, isLoading }] = useLazyGetGoodsQuery();
  // if (!isLoading) {
  //   return <Loader type="absolute" />;
  // }
  const userCity = selectorApp((state) => state.reducer.userCity.currentCity);
  // console.log('userCity', userCity);
  // console.log(data);
  React.useEffect(() => {
    getGoods();
  }, [getGoods, userCity]);
  return (
    <section>
      <div className="cardBlock__container">
        <div>
          {/* {Object.values(pizzas).map((food) => {
        return (
          <div className={cl.cardBlock__wrapper} id={`${food.anchor}`}>
            <p className={cl.cardBlock__blockTitle}>
              <span className="h1">{food.title}</span>{" "}
              <Button btnType="filter">Фильтры</Button>
            </p>
            <div className={cl.cardBlock__block}>
              {food.data.map((foodItem) => {
                return <CardItem food={foodItem} key={foodItem.title} />;
              })}
            </div>
          </div>
        );
      })} */}
          <div>
            <div className={cl.cards}>
              {data?.length &&
                data.map((el) => {
                  // console.log('el', el.name);
                  return (
                    <div key={el.name} className={cl.card}>
                      <h1 id={`${el.anchor}`} className={`h1 ${cl.title}`}>
                        {el.title}
                      </h1>
                      {/* <div className={cl.items}> */}
                      {el.items.map((food) => {
                        // console.log('food', food);
                        return (
                          <React.Fragment key={food.title}>
                            <CardItem food={food} />
                          </React.Fragment>
                        );
                      })}
                      {/* </div> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardBlock;
