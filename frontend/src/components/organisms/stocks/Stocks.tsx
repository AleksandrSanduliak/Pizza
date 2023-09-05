import React from "react";
import cl from "./stockCard.module.scss";
import onePizza from "assets/stocks/pizzaBcg.webp";
import threePizzas from "assets/stocks/threePizzaBackgroud.webp";
const Stocks = () => {
  return (
    <section className={cl.stockcard}>
      <div className={cl.stockcard__red}>
        <img loading="lazy" src={onePizza} alt="Пицца на фоне блока" />
        <div>
          <p>
            Кэшбек 10% на<br></br>самовывоз (доставка)
          </p>
        </div>
      </div>
      <div className={cl.stockcard__orange}>
        <img loading="lazy" src={threePizzas} alt="Три пиццы на фоне блока" />
        <div>
          <p>
            3 средние пиццы<br></br>от 999 рублей
          </p>
        </div>
      </div>
      <div className={cl.stockcard__red}>
        <img loading="lazy" src={onePizza} alt="Пицца на фоне блока" />
        <div>
          <p>
            Кэшбек 10% на<br></br>самовывоз (доставка)
          </p>
        </div>
      </div>
      <div className={cl.stockcard__orange}>
        <img loading="lazy" src={threePizzas} alt="Три пиццы на фоне блока" />
        <div>
          <p>
            3 средние пиццы<br></br>от 999 рублей
          </p>
        </div>
      </div>
    </section>
  );
};

export default Stocks;
