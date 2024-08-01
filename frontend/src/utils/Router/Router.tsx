import { Routes, Route, useLocation } from "react-router-dom";
import MainPage from "pages/MainPage";
import Layout from "src/components/templates/Layout";
import NotFound from "pages/NotFound";
import RequireAuth from "utils/hoc/RequireAuth";
import Settings from "pages/Settings";
import OrderHistory from "pages/OrderHistory";
import Order from "pages/Order/Order";

const Router = () => {
  const location = useLocation();

  return (
    <Routes location={location}>
      <Route path="/" element={<Layout />}>
        <Route index element={<MainPage />} />
        <Route
          path="settings"
          element={
            <RequireAuth>
              <Settings />
            </RequireAuth>
          }
        />
        <Route
          path="orderhistory"
          element={
            <RequireAuth>
              <OrderHistory />
            </RequireAuth>
          }
        />
        <Route
          path="order"
          element={
            <RequireAuth>
              <Order />
            </RequireAuth>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Router;
