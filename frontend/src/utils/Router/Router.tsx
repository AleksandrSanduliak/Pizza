import React from "react";
import { Routes, Route } from "react-router-dom";
import MainPage from "pages/MainPage";
import Layout from "pages/Layout";
import NotFound from "pages/NotFound";
import RequireAuth from "utils/hoc/RequireAuth";
import Settings from "pages/Settings";
import OrderHistory from "pages/OrderHistory";
const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="/settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="/orderhistory"
          element={
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
