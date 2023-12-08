import React from "react";
import cl from "./cardBlock.module.scss";
import pizzas from "utils/data/pizzas.json";
import CardItem from "molecules/cardItem/CardItem";
const CardBlock = () => {
  console.log(pizzas);
  return (
    <div className={cl.cardBlock}>
      {Object.values(pizzas).map((food) => {
        return (
          <div className={cl.cardBlock__wrapper} id={`${food.anchor}`}>
            <p className={cl.cardBlock__blockTitle}>{food.title}</p>
            <div className={cl.cardBlock__block}>
              {food.data.map((foodItem) => {
                return <CardItem food={foodItem} key={foodItem.title} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CardBlock;
