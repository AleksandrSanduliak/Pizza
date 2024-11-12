import React from 'react';

import SVG from 'react-inlinesvg';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';

import { visibleStatus } from 'store/slices/categoriesSlice';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { categories } from 'utils/data/categories';
import useAccount from 'utils/hooks/useAccount';
import useCheckVisible from 'utils/hooks/useCheckVisible';
import cl from './cartCategory.module.scss';

const Categories = () => {
  const childRef = React.useRef<HTMLElement>(null);

  const [visible, setIsVisible] = useCheckVisible(childRef, '-100px');
  const dispatch = useDispatch();
  const { isBurgerClick } = useAccount();
  // console.log('Categories visible', visible);
  React.useEffect(() => {
    if (location.pathname !== '/') {
      // console.log('location.pathname !== "/"', location.pathname !== '/');
      setIsVisible(true);
      return;
    }
    if (isBurgerClick) {
      setIsVisible(true);
      return;
    }
    dispatch(visibleStatus(visible));
  }, [visible, dispatch, isBurgerClick, setIsVisible]);

  const categoriesSlicedLastElem = categories.slice(0, -1);

  const actualLocation = `${location.hash}`.slice(1);
  return (
    <>
      {location.pathname === '/' && (
        <section className={cl.swiper__container}>
          <div>
            <Swiper
              slidesPerView="auto"
              spaceBetween={20}
              className={cl.swiper}
              breakpoints={{
                280: {
                  slidesPerView: 2.7,
                },
                320: {
                  slidesPerView: 2.5,
                },
                425: {
                  slidesPerView: 3.6,
                },
                500: {
                  slidesPerView: 4.6,
                },
                700: {
                  slidesPerView: 5.6,
                },
                768: {
                  slidesPerView: 5.6,
                },
                900: {
                  slidesPerView: 6.6,
                },
                991: {
                  slidesPerView: 8,
                },
                1280: {
                  slidesPerView: categoriesSlicedLastElem.length,
                },
                1440: {
                  slidesPerView: categoriesSlicedLastElem.length,
                },
              }}>
              {categoriesSlicedLastElem.map((category) => {
                return (
                  <SwiperSlide key={category.name} className={cl.slide}>
                    <NavHashLink
                      smooth
                      to={`/#${category.path}`}
                      className={`${cl.slide__link} ${
                        actualLocation === category.path ? cl.activelink : ''
                      }`}>
                      <SVG
                        description={`Иконка категории ${category.name}`}
                        onError={(error) => console.log(error.message)}
                        title={category.path}
                        src={`${category.img}`}
                        className={cl.slide__image}
                      />
                      <p className={`bigtext ${cl.slide__text}`}>
                        {category.name}
                      </p>
                    </NavHashLink>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
          <div ref={childRef as React.RefObject<HTMLDivElement>} />
        </section>
      )}
    </>
  );
};

export default Categories;
