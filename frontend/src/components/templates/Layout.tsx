import React from 'react';
import Header from 'organisms/header/Header';
import { Outlet } from 'react-router-dom';
import Footer from 'organisms/footer/Footer';

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
