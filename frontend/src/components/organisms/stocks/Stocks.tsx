// import React from "react";
import cl from "./stockCard.module.scss";
import onePizza from "assets/stocks/pizzaBcg.webp";
import orange from "assets/stocks/orange.png";
import threePizzas from "assets/stocks/threePizzaBackgroud.webp";
import { Swiper, SwiperSlide } from "swiper/react";
type cardItem = {
  id: number;
  classNames: string;
  src: string;
  text?: string;
};

const cards: cardItem[] = [
  {
    id: 1,
    classNames: cl.stockcard__red,
    src: onePizza,
    text: `Кэшбек 10% на\nсамовывоз (доставка)`,
  },
  {
    id: 2,
    classNames: cl.stockcard__orange,
    src: threePizzas,
    text: `3 средние пиццы\nот 999 рублей`,
  },
  {
    id: 4,
    classNames: cl.stockcard__red,
    src: onePizza,
    text: `Кэшбек 10% на\nсамовывоз (доставка)`,
  },
  {
    id: 5,
    classNames: cl.stockcard__orange,
    src: threePizzas,
    text: `3 средние пиццы\nот 999 рублей`,
  },
  // {
  //   id: 6,
  //   classNames: cl.stockcard__orange,
  //   src: orange,
  //   // text: `3 средние пиццы\nот 999 рублей`,
  // },
];
const breaks = {
  320: {
    slidesPerView: 1.3,
  },
  400: {
    slidesPerView: 2,
  },
  425: {
    slidesPerView: 2.2,
    spaceBetween: 20,
  },
  768: {
    slidesPerView: 2.7,
    spaceBetween: 20,
  },
  991: {
    slidesPerView: 3.5,
  },
  1024: {
    slidesPerView: 4,
  },
};
const Stocks = () => {
  return (
    <section className={cl.stockcard}>
      <Swiper
        slidesPerView={cards.length}
        spaceBetween={30}
        breakpoints={breaks}
      >
        {cards.map((el: cardItem) => {
          return (
            <SwiperSlide key={el.id} className={el.classNames}>
              <img loading="lazy" src={el.src} alt="Пицца на фоне блока" />
              <div>
                <p className="h4">{el.text}</p>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
};

export default Stocks;
