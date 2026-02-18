import { ROUTES } from '@/5-shared/consts/routes';

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const CatalogPage = lazy(() => import('@pages/CityCatalog/CityCatalog'));
const CategoriesPage = lazy(() => import('@pages/Categories/ui/Categories'));
const GlobalCategoryPage = lazy(() => import('@/2-pages/GlobalCategory/global-category'));
const ProductPage = lazy(() => import('@pages/Product/Product'));
const CititesCategoriesPage = lazy(() => import('@pages/CitiesCategories/ui/CititesCategories'));
const CityPage = lazy(() => import('@pages/CitiesCategories/ui/City'));
const CityCategory = lazy(() => import('@pages/CitiesCategories/ui/CityCategory/CityCategory'));

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    children: [
      // catalog
      { path: ROUTES.CITYCATALOG, element: <CatalogPage /> },
      { path: ROUTES.CATEGORIES, element: <CategoriesPage /> },
      {
        path: ROUTES.CATEGORY,
        element: <GlobalCategoryPage />,
      },
      {
        path: ROUTES.PRODUCT,
        element: <ProductPage />,
      },
      // city
      { path: ROUTES.CITIESCATEGORIES, element: <CititesCategoriesPage /> },
      {
        path: ROUTES.CITY,
        element: <CityPage />,
      },
      {
        path: ROUTES.CITYCATEGORY,
        element: <CityCategory />,
      },
    ],
  },
]);

