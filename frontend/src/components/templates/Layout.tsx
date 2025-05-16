import React from 'react';

import { Outlet } from 'react-router-dom';

import Footer from 'organisms/Footer/Footer';
import Header from 'organisms/Header/Header';
// const Header = React.lazy(() => import('organisms/Header/Header'));
// const Footer = React.lazy(() => import('organisms/Footer/Footer'));
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
