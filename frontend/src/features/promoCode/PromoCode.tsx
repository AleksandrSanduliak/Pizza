import React from 'react';

import { useGetPromoMutation } from '@app/(main-page)/[city]/(order)/order/orderApi';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';

import cl from './promocode.module.scss';

const PromoCode = () => {
  const dispatch = useAppDispatch();
  const { totalPrice, isPromoCodeActive } = useAppSelector((state) => state.reducer.cartShopSlice);
  // console.log('isPromoCodeActive', isPromoCodeActive);
  const [inputData, setDataInput] = React.useState('');
  const [getPromo, { data, isLoading, isError, error, isSuccess }] = useGetPromoMutation();
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
      {/* <CompoundButton
        type="submit"
        buttonType="default"
        buttonMode="primary"
        onClick={() => getReq}
      /> */}
    </div>
  );
};

export default PromoCode;
