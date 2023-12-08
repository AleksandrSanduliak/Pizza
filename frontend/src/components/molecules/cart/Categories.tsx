import React from "react";

import SVG from "react-inlinesvg";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { HashLink, NavHashLink } from "react-router-hash-link";

import { categories } from "utils/data/categories";
import { Swiper, SwiperSlide } from "swiper/react";
import useCheckVisible from "utils/hooks/useCheckVisible";
import { visibleStatus } from "store/slices/categoriesSlice";
import "swiper/css";
import cl from "./cartCategory.module.scss";

console.log();
const categoriesSlicedLastElem = categories.slice(0, -1);
const Categories = () => {
  console.log("render elemebt");
  const childRef = React.useRef();
  const visible = useCheckVisible(childRef, "-100px");
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(visibleStatus(visible));
    console.log("work");
  }, [visible]);
  console.log(visible, " hello ");
  const location = useLocation();
  return (
    <>
      <section className={cl.cart}>
        <div className="cart__container">
          <Swiper
            slidesPerView={categoriesSlicedLastElem.length}
            spaceBetween={`${visible ? 20 : 0}`}
            breakpoints={{
              280: {
                slidesPerView: 2,
              },
              320: {
                slidesPerView: 2.7,
              },
              400: {
                slidesPerView: 3,
              },
              425: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              991: {
                slidesPerView: 5,
              },
            }}
            className={`${visible ? cl.cart__list : cl.notVisible}`}
          >
            {categoriesSlicedLastElem.map((category) => {
              return (
                <SwiperSlide
                  key={category.name}
                  className={`${!visible ? "" : cl.cart__category}`}
                >
                  <NavHashLink
                    smooth
                    to={`/#${category.path}`}
                    className={
                      `${location.hash}`.slice(1) === category.path
                        ? cl.activelink
                        : ""
                    }
                  >
                    <SVG
                      description={`Иконка категории ${category.name}`}
                      onError={(error) => console.log(error.message)}
                      title={category.path}
                      src={`${category.img}`}
                      className={cl.cart__category__image}
                    />
                    <p>{category.name}</p>
                  </NavHashLink>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      </section>
      <div ref={childRef}></div>
    </>
  );
};

export default Categories;
