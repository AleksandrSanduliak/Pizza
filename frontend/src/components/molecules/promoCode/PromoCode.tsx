import { Button } from 'atoms/button/Button';
import debounce from 'lodash.debounce';
import React from 'react';
import { useGetPromoMutation } from 'store/api/orderApi';
import { setDiscountPrice } from 'store/slices/cartSlice';
import { useAppDispatch, useAppSelector } from 'utils/hooks/redux';
import cl from './promocode.module.scss';
const PromoCode = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, isPromoCodeActive } = useAppSelector(
    (state) => state.reducer.cartShopSlice,
  );
  // console.log('isPromoCodeActive', isPromoCodeActive);
  const [inputData, setDataInput] = React.useState('');
  const [getPromo, { data, isLoading, isError, error, isSuccess }] =
    useGetPromoMutation();
  const onInputChange = (e) => {
    // console.log('data ', e.target.value);
    setDataInput(e.target.value);
    // getPromo("hello");
  };
  const getReq = () => {
    // console.log('getReq', inputData);
    getPromo({ promoCode: inputData, totalPrice: totalPrice });
  };

  return (
    <div className={cl.promo}>
      <input
        value={inputData}
        onChange={(e) => onInputChange(e)}
        placeholder="Промокод"
        type="text"
        className={`input ${cl.promoInput}`}
      />
      <Button btnType="checkAdress" onClick={() => getReq} />
    </div>
  );
};

export default PromoCode;
