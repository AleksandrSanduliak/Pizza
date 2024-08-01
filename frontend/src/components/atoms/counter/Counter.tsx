import React from "react";
import cl from "./counter.module.scss";
import plus from "assets/icons/plus.svg";
import minus from "assets/icons/minus.svg";
import { useAppDispatch, useAppSelector } from "utils/hooks/redux";
import { increment, decrement } from "store/slices/cartSlice";
import {
  useDecrementCardItemMutation,
  useIncrementCardItemMutation,
} from "store/api/orderApi";
type TCounter = {
  value: number;
  id: number;
};
const Counter = ({ value = 1, id }: TCounter) => {
  const [
    incrementItem,
    {
      incrementData,
      incrementIsLoading,
      incrementIsError,
      incrementError,
      incrementIsSuccess,
    },
  ] = useIncrementCardItemMutation();
  const [
    decrementItem,
    {
      decrementData,
      decrementIsLoading,
      decrementIsError,
      decrementError,
      decrementIsSuccess,
    },
  ] = useDecrementCardItemMutation();
  const dispatch = useAppDispatch();

  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);

  const incrementCount = () => {
    if (!isAuth) dispatch(increment(id));
    console.log("item ID", id);
    incrementItem({ id: id });
  };

  const decrementCount = () => {
    if (!isAuth) dispatch(decrement(id));
    console.log("item ID", id);
    decrementItem({ id: id });
  };

  return (
    <div className={cl.wrapper}>
      <button className={cl.button} onClick={decrementCount}>
        <img
          className={cl.img}
          width="14px"
          height="14px"
          src={minus}
          loading="lazy"
          alt="Плюс"
        />
      </button>
      <span className="subtitle2">{value}</span>
      <button className={cl.button} onClick={incrementCount}>
        <img
          className={cl.img}
          width="14px"
          height="14px"
          src={plus}
          loading="lazy"
          alt="Минус"
        />
      </button>
    </div>
  );
};

export default Counter;
