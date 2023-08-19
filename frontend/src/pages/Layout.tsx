import React from "react";
import Header from "../components/organisms/header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../components/organisms/footer/Footer";

const Layout = () => {
  return (
    <>
      <div className="wrapper">
        <Header />
        <main className="main">
          <Outlet />
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Layout;
