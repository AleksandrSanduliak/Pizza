import { Button } from 'atoms/button/Button';
import Label from 'atoms/label/Label';
import CardItemModal from 'molecules/modals/CardItemModal/CardItemModal';
import React from 'react';
import { Slide, toast } from 'react-toastify';
import { useSaveCardMutation } from 'store/api/orderApi';
import { addItem } from 'store/slices/cartSlice';
import { pizzaTypes } from 'utils/data/pizzaData';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import { foodType } from 'utils/types/types';
import cl from './CardItem.module.scss';

const CardItem = ({ food }: foodType) => {
  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);
  const [showModal, setIsShowModal] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery();
  const [saveCard, { isLoading, isError, isSuccess }] = useSaveCardMutation();

  const toastId = React.useRef<string | number>(0);

  const notifyToast = () =>
    (toastId.current = toast.loading('Добавление товара...', {
      autoClose: false,
      toastId: toastId.current,
    }));

  const succesToast = () =>
    toast.update(toastId.current, {
      render: `Добавлено: ${food.title}`,
      toastId: toastId.current,
      type: toast.TYPE.SUCCESS,
      autoClose: 1000,
      closeButton: true,
      isLoading: false,
    });

  const errorToast = () =>
    toast.update(toastId.current, {
      render: `Ошибка, повторите попытку позже`,
      toastId: toastId.current,
      type: toast.TYPE.ERROR,
      autoClose: 1000,
      closeButton: true,
      isLoading: false,
    });

  const ButtonComp = () => {
    return isMobile ? (
      <div className={cl.btn__wrapper}>
        <Button
          primary={false}
          btnType="card"
          onClick={(e: React.MouseEvent<Element, MouseEvent>): void => {
            e.preventDefault();
            addToCart(e);
          }}>
          <p className="subtitle">от {food.price?.[1] ?? food.price} ₽</p>
        </Button>
        {food.oldprice && (
          <p className="subtitle price__old">{food.oldprice} ₽</p>
        )}
      </div>
    ) : (
      <>
        <Button
          primary={true}
          btnType="card"
          onClick={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
            addToCart(e)
          }>
          {food?.sizes?.length > 1 ? 'Выбрать' : 'В корзину'}
        </Button>
        <div className={cl.price}>
          <p className="subtitle">от {food.price?.[1] ?? food.price} ₽</p>
          {food.oldprice && (
            <p className="subtitle price__old">{food.oldprice} ₽</p>
          )}
        </div>
      </>
    );
  };

  const addToCart = (e) => {
    // stopBubling(e);
    if (isAuth) {
      saveCard({
        id: food.id,
        category: food.category,
        desc: food.desc,
        title: food.title,
        sizes: food?.sizes && food.sizes[1],
        types: pizzaTypes?.[food.types?.[0]] ?? null,
        price: food?.price[1] ?? food?.price[0],
        imageUrl: food.imageUrl,
        nutrition_facts: {
          ...food.nutrition_facts,
          weight: food?.weightTypes?.[food.types?.[0]]?.[food.sizes?.[1]],
        },
      });
    } else {
      dispatch(addItem(food));
      toast.info(`Добавлено: ${food.title}`, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        theme: 'light',
        transition: Slide,
      });
    }
  };

  if (isLoading) {
    notifyToast();
  }
  if (isSuccess) {
    succesToast();
  }
  if (isError) {
    errorToast();
  }

  return (
    <div
      onClick={() => setIsShowModal((prev) => !prev)}
      className={`${cl.item} ${food.disabled ? cl.disabled : ''}`}>
      {showModal && <CardItemModal food={food} />}
      <Label labelType={food.labeltype} />
      <div className={cl.img__wrapper}>
        <img
          src={food.imageUrl}
          alt={food.title}
          loading="lazy"
          className={cl.img}
        />
        {!isMobile && (
          <div className={cl.text}>
            <p className={`${cl.text__title} subtitle`}>{food.title}</p>
            <p className={`${cl.text__desc} normal`}>{food.desc}</p>
          </div>
        )}
      </div>
      <div className={`${cl.footer} subtitle`}>
        {isMobile && (
          <div className={cl.text}>
            <p className={`${cl.text__title} subtitle`}>{food.title}</p>
            <p className={`${cl.text__desc} normal`}>{food.desc}</p>
          </div>
        )}
        {!food.disabled && <ButtonComp />}
      </div>
    </div>
  );
};

export default CardItem;
