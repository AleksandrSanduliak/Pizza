import SVG from 'react-inlinesvg';
import { useLocation } from 'react-router-dom';
import { NavHashLink } from 'react-router-hash-link';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { categories } from 'utils/data/categories';
import { useAppSelector } from 'utils/hooks/redux';
import cl from './navmiddle.module.scss';

const NavMiddle = () => {
  const visible = useAppSelector((store) => store.reducer.isVisible.isVisible);
  const location = useLocation();
  const categoriesSlicedLastElem = categories.slice(0, -1);
  const actualArray = visible ? categoriesSlicedLastElem : categories;
  const actualLocation = `${location.hash}`.slice(1);

  return (
    <>
      {!visible && location.pathname === '/' && (
        <div
          className={`${cl.headerNavWrapper} ${visible ? cl.notVisible : ''}`}>
          <Swiper
            slidesPerView="auto"
            spaceBetween={20}
            breakpoints={{
              280: {
                slidesPerView: 2.5,
                spaceBetween: 10,
              },
              320: {
                spaceBetween: 10,
                slidesPerView: 2.5,
              },
              425: {
                spaceBetween: 10,
                slidesPerView: 3.6,
              },
              768: {
                spaceBetween: 10,
                slidesPerView: 5.5,
              },
              991: {
                slidesPerView: 6.6,
              },
              1280.98: {
                slidesPerView: actualArray.length,
              },
              1440: {
                slidesPerView: actualArray.length,
              },
            }}
            className={`${cl.swiper} `}>
            {actualArray.map((category) => {
              return (
                <SwiperSlide key={category.name} className={`${cl.slide}`}>
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
                      className={cl.slide__img}
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
      )}
    </>
  );
};

export default NavMiddle;
