import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { SwiperOptions } from 'swiper/types';

interface ISwiperKey {
  name: string;
}

interface ICustomSwiper<T extends ISwiperKey> {
  list: T[];
  isVisible?: boolean;
  Slide: React.FC<{ item: T }>;
  swiperSettings: SwiperOptions;
  slideClass: string;
}

const CustomSwiper = <T extends ISwiperKey>({
  list,
  isVisible = true,
  Slide,
  swiperSettings,
  slideClass,
}: ICustomSwiper<T>) => {
  return (
    <>
      {isVisible && (
        <Swiper {...swiperSettings}>
          {list.map((item: T) => {
            return (
              <SwiperSlide key={item.name} className={slideClass}>
                <Slide item={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      )}
    </>
  );
};

export default CustomSwiper;
