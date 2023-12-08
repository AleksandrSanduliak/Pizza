import { createBrowserRouter } from "react-router-dom";
import MainPage from "pages/MainPage";
import Layout from "pages/Layout";
import NotFound from "pages/NotFound";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{}],
  },
]);
