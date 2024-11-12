import { zodResolver } from '@hookform/resolvers/zod';
import { FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

import { Button } from 'atoms/button/Button';
import Tabs from 'molecules/tabs/Tabs';
import React from 'react';
import { useHookFormMask } from 'use-mask-input';
import { useAppSelector } from 'utils/hooks/redux';
import { orderForm } from 'utils/types/types';
import { orderSchema } from 'utils/zodSchemas/orderSchema';
import FormItem from '../FormItem/FormItem';
import cl from './orderform.module.scss';

const OrderForm = ({ saveOrder }: { saveOrder: any }) => {
  const tabs = ['Доставка', 'Самовывоз'];
  const [activeTab, setActiveTab] = React.useState<number>(0);
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<orderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      deliveryType: tabs[activeTab],
      whenOrderBeFilled: 'Как можно скорее',
      payment: 'Картой',
      shortChange: 'Без сдачи',
    },
    mode: 'onChange',
  });

  const { totalPrice } = useAppSelector((state) => state.reducer.cartShopSlice);
  const onSubmit: SubmitHandler<orderForm> = (data) => {
    // setValue("deliveryType", tabs[activeTab]);
    // console.log(data);
    saveOrder({ userInfo: data });
  };
  const onInvalid = (errors: FieldErrors) => console.error(errors);
  const registerWithMask = useHookFormMask(register);

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
      <div className={cl.aboutYou}>
        <div className="inputValidationBlock">
          <FormItem htmlFor="name" title="Имя" errors={errors} />
          <input id="name" {...register('name')} className="input" />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="phone" title="Номер телефона" errors={errors} />
          <input
            className="input"
            id="phone"
            {...registerWithMask('phone', ['+7 999 999-99-99'], {
              required: true,
            })}
          />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="email" title="Email" errors={errors} />
          <input
            className="input"
            id="email"
            {...register('email', {
              required: 'required',
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Entered value does not match email format',
              },
            })}
          />
        </div>
      </div>
      <div className={cl.delivery}>
        <h2>Доставка</h2>
        <Tabs
          tabsArray={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </div>
      <FormItem htmlFor="street" title="Улица" errors={errors} />
      <input
        className="input"
        id="street"
        {...register('street', {
          required: 'required',
        })}
      />
      <div className={cl.clientAddress}>
        <div className="inputValidationBlock">
          <FormItem htmlFor="house" title="Дом" errors={errors} />
          <input className="input" id="house" {...register('house')} />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="entrance" title="Подъезд" errors={errors} />
          <input
            className="input"
            id="entrance"
            type="number"
            {...register('entrance', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="floor" title="Этаж" errors={errors} />
          <input
            className="input"
            id="floor"
            type="number"
            {...register('floor', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="apartment" title="Квартира" errors={errors} />
          <input
            className="input"
            id="apartment"
            type="number"
            {...register('apartment', {
              valueAsNumber: true,
            })}
          />
        </div>

        <div className="inputValidationBlock">
          <FormItem htmlFor="intercom" title="Домофон" errors={errors} />
          <input
            className="input"
            id="intercom"
            type="string"
            {...register('intercom')}
          />
        </div>
      </div>
      <div className={cl.column}>
        <label htmlFor="whenOrderBeFilled" className="label">
          <p>Когда выполнить заказ?</p>
        </label>
        <div className={cl.rowsWrapper}>
          <div className={cl.row}>
            <input
              id="whenOrderBeFilled"
              type="radio"
              value="Как можно скорее"
              {...register('whenOrderBeFilled')}
            />
            <span>Как можно скорее</span>
          </div>
          <div className={cl.row}>
            <input
              id="whenOrderBeFilled"
              type="radio"
              value="По времени"
              {...register('whenOrderBeFilled')}
            />
            <span>По времени</span>
          </div>
        </div>
      </div>

      <div className={cl.column}>
        <label htmlFor="payment" className="label">
          <p>Оплата</p>
        </label>
        <div className={cl.rowsWrapper}>
          <div className={cl.row}>
            <input
              id="payment"
              type="radio"
              value="Картой"
              {...register('payment')}
            />
            <span>Картой</span>
          </div>
          <div className={cl.row}>
            <input
              id="payment"
              type="radio"
              value="Наличными"
              {...register('payment')}
            />
            <span>Наличными</span>
          </div>
          <div className={cl.row}>
            <input
              id="payment"
              type="radio"
              value="Картой при получении"
              {...register('payment')}
            />
            <span> Картой при получении</span>
          </div>
        </div>
      </div>

      <div className={cl.column}>
        <label htmlFor="shortChange" className="label">
          <p>Сдача</p>
        </label>
        <div className={cl.rowsWrapper}>
          <div className={cl.row}>
            <input
              id="shortChange"
              type="radio"
              value="Без сдачи"
              {...register('shortChange')}
            />
            <span>Без сдачи</span>
          </div>
          <div className={cl.row}>
            <input
              id="shortChange"
              type="radio"
              value="Сдача с"
              {...register('shortChange')}
            />
            <span>Сдача с</span>
          </div>
        </div>
      </div>
      <div className={cl.column}>
        <label htmlFor="comment" className="label">
          <p>Комментарий</p>
        </label>
        <div className={cl.rowsWrapper}>
          <input
            placeholder="Есть уточнения к заказу?"
            id="comment"
            type="text"
            className="input"
            {...register('shortChange')}
          />
        </div>
      </div>
      <div className={cl.formFooter}>
        <p className="h4 price__actual">Итого: {totalPrice} ₽</p>
        <Button isSubmit={true}>Оформить заказ</Button>
      </div>
    </form>
  );
};

export default OrderForm;
