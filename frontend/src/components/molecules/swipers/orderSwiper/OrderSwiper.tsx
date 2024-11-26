import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from 'atoms/button/Button';
import SVG from 'react-inlinesvg';
import 'swiper/css/navigation';
import { Navigation } from 'swiper/modules';
import cl from './orderswiper.module.scss';
const OrderSwiper = ({ array }: { array: [] }) => {
  const swiperRef = React.useRef(null);
  return (
    <div className={cl.wrapper}>
      <Button
        btnType="orderLeft"
        onClick={() => swiperRef?.current?.swiper?.slidePrev()}
      />
      <Swiper
        modules={[Navigation]}
        slidesPerView="auto"
        spaceBetween={30}
        breakpoints={{
          280: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          425: {
            slidesPerView: 1.7,
            spaceBetween: 10,
          },
          580: {
            slidesPerView: 2.2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2.5,
            spaceBetween: 10,
          },
          991: {
            slidesPerView: 3.7,
          },
          1280: {
            slidesPerView: 5,
          },
        }}
        ref={swiperRef}
        navigation={{
          nextEl: '.next',
          prevEl: '.prev',
        }}
        className={cl.swiper}>
        {array.map((food) => {
          return (
            <SwiperSlide key={food.id} className={cl.slide}>
              <SVG
                description={`Иконка категории ${food.name}`}
                onError={(error: { message: string }) =>
                  console.log(error.message)
                }
                title={food.name}
                src={`${food.img}`}
                className={cl.img}
              />
              <div className={cl.text}>
                <div className={cl.textTop}>
                  <p className={`subtitle ${cl.title}`}>{food.name}</p>
                  {food.weight && (
                    <p className={`mini ${cl.subtitle}`}>
                      Порция {food.weight}
                    </p>
                  )}
                </div>
                <Button primary={true} btnType="card">
                  {food?.price} ₽
                </Button>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <Button
        btnType="orderRight"
        onClick={() => swiperRef?.current?.swiper?.slideNext()}
      />
    </div>
  );
};

export default OrderSwiper;
