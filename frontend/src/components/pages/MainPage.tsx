import React from "react";
import Header from "organisms/header/Header";
import { useLogoutUserMutation } from "store/reducers/api/authApi";
import Categories from "molecules/categories/Categories";
import Stocks from "organisms/stocks/Stocks";
import CheckAdress from "organisms/checkAdress/CheckAdress";
import { useAppSelector } from "../../utils/hooks/redux";
import CatExample from "molecules/categories/CatExample";
const MainPage = () => {
  const [logout] = useLogoutUserMutation();
  const user = useAppSelector((state) => state.reducer);
  const logouts = () => {
    logout(document.cookie);
    console.log(user, "user mainpage");
  };
  return (
    <>
      <section className="caregorr">
        {/* <Categories /> */}
        <div className="categorr__container">
          <br></br>
          <button onClick={logouts}>LOGOUT</button>
          {/* <Stocks /> */}
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
