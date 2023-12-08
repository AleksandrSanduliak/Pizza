import React from "react";
import cl from "./CardItem.module.scss";
import { Button } from "atoms/button/Button";
import { useAppSelector } from "utils/hooks/redux";
import { useAppDispatch } from "utils/hooks/redux";
import { addItem } from "store/slices/cartSlice";
import { pizzaItem, foodType } from "utils/types/types";
const CardItem = ({ food }: foodType) => {
  const dispatch = useAppDispatch();
  // console.log(food, "food");

  const addToCart = () => {
    console.log("click", food);
    dispatch(addItem(food));
  };
  const selector = useAppSelector((state) => state.reducer.cartShopSlice);
  console.log(selector);
  return (
    <div className={cl.carditem}>
      <img
        src={food.imageUrl}
        alt={food.title}
        loading="lazy"
        className={cl.carditem__img}
      />
      <div className={cl.carditem__text}>
        <p className={cl.carditem__text_title}>{food.title}</p>
        <p className={cl.carditem__text_desc}>{food.desc}</p>
        <div className={cl.carditem__footer}>
          <Button onClick={addToCart}>Выбрать</Button>
          <p>от {food.price} ₽</p>
        </div>
      </div>
    </div>
  );
};

export default CardItem;
