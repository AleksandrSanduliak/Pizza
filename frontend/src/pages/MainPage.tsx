import React from "react";
import Header from "../components/organisms/header/Header";
import { useLogoutUserMutation } from "../store/authApi";
import Categories from "../components/molecules/categories/Categories";
import Stocks from "../components/organisms/stocks/Stocks";
import CheckAdress from "../components/organisms/checkAdress/CheckAdress";
const MainPage = () => {
  const [logout] = useLogoutUserMutation();
  const logouts = () => {
    console.log("logged out");
    const cookie = document.cookie;
    console.log(cookie);
    logout(cookie);
  };
  return (
    <>
      <section className="caregorr">
        <div className="categorr__container">
          <br></br>
          <button onClick={logouts}>LOGOUT</button>
          <Categories />
          <Stocks />
          <CheckAdress />
          <section style={{ marginTop: "1000px" }} id="pizza">
            pizza
          </section>
          <section style={{ marginTop: "1000px" }} id="sushi">
            sushi
          </section>
          <section style={{ marginTop: "1000px" }} id="drinks">
            drinks
          </section>
          <section style={{ marginTop: "1000px" }} id="snacks">
            snack
          </section>
          <section style={{ marginTop: "1000px" }} id="combo">
            combo
          </section>
        </div>
      </section>
    </>
  );
};

export default MainPage;
