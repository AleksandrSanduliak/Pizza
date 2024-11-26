import Fade from 'atoms/fade/Fade';
import ShoppingItem from 'molecules/shoppingItem/ShoppingItem';

import emptyCard from 'assets/icons/emptyCard.svg';
import { Button } from 'atoms/button/Button';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'utils/hooks/redux';
import useAccount from 'utils/hooks/useAccount';
import useMediaQuery from 'utils/hooks/useMediaQuery';
import cl from './shopcartmodal.module.scss';

const ShopCartModal = ({ isFade = true }) => {
  const isAuth = useAppSelector((store) => store.reducer.auth.isAuth);
  const items = useAppSelector((state) => state.reducer.cartShopSlice.items);
  const totalPrice = useAppSelector(
    (state) => state.reducer.cartShopSlice.totalPrice,
  );
  const navigate = useNavigate();
  const { onClickShoppingBag, setAuthForDesktop, setAuthForMobile } =
    useAccount();
  const isMobile = useMediaQuery();
  // console.log('items: ', items);
  const handleMakeOrder = () => {
    if (!isAuth) {
      isMobile ? setAuthForMobile() : setAuthForDesktop();
      toast.info('Войдите в аккаунт, чтобы сделать заказ', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
      return;
    }
    navigate('/order');
    onClickShoppingBag();
  };
  const closeOnCross = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    stopBubling(e);
    onClickShoppingBag();
  };
  const totalCount = useAppSelector(
    (state) => state.reducer.cartShopSlice.totalCount,
  );

  return (
    <div className={`${cl.modal} ${cl.activeModal}`}>
      {isFade && <Fade />}
      <div
        // onClick={stopBubling}
        className={cl.content}>
        {items.length >= 1 ? (
          <div className={cl.card}>
            <div className={cl.header}>
              <h1 className={`h1 ${cl.headerTitle}`}>Ваш заказ</h1>
            </div>
            <div className={cl.pizzas}>
              <ul>
                {items.map((el) => {
                  return <ShoppingItem key={el?.title} data={el} />;
                })}
              </ul>
            </div>
            <div className={cl.results}>
              <p className="h4">Итого: {totalPrice} ₽</p>

              <Button
                onClick={() => handleMakeOrder()}
                primary={true}
                btnType="card">
                Оформить заказ
              </Button>
            </div>
          </div>
        ) : (
          <div className={cl.empty}>
            <img
              width="306px"
              height="120px"
              loading="lazy"
              alt="Корзина пуста"
              src={emptyCard}
            />
            <div className={cl.emptyText}>
              <h2 className="h3">Ой, пусто! </h2>
              <p className="normal">
                Ваша корзина пуста, откройте «Меню» и выберите понравившийся
                товар. Мы доставим ваш заказ от 549 ₽
              </p>
            </div>
          </div>
        )}
      </div>
      <div className={cl.img} onClick={(e) => closeOnCross(e)}>
        <svg
          width="25"
          height="25"
          viewBox="0 0 25 25"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.61 12.199L.54 3.129A1.833 1.833 0 113.13.536l9.07 9.07L21.27.54a1.833 
            1.833 0 012.592 2.592l-9.068 9.068 9.07 9.07a1.833 1.833 0 01-2.59 2.592l-9.072-9.07-9.073 9.073a1.833 
            1.833 0 01-2.591-2.592L9.61 12.2z"
            fill="currentColor"
          />
        </svg>
      </div>
    </div>
  );
};

export default ShopCartModal;
