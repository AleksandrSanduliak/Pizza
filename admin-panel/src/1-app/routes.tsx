import { ROUTES } from '@/5-shared/consts/routes';

import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import App from './App';

const CategoriesPage = lazy(() => import('@/2-pages/global-catalog/global-categories/categories'));
const GlobalCategoryPage = lazy(
  () => import('@/2-pages/global-catalog/global-category/global-category')
);
const ProductPage = lazy(() => import('@/2-pages/global-catalog/product/Product'));
const CititesCategoriesPage = lazy(() => import('@pages/CitiesCategories/ui/CititesCategories'));
const CityPage = lazy(() => import('@pages/CitiesCategories/ui/City'));
const CityCategory = lazy(() => import('@pages/CitiesCategories/ui/CityCategory/CityCategory'));

export const router = createBrowserRouter([
  {
    path: ROUTES.MAIN,
    element: <App />,
    children: [
      // global catalog
      { path: ROUTES.GLOBAL_CATEGORIES, element: <CategoriesPage /> },
      {
        path: ROUTES.GLOBAL_CATEGORY,
        element: <GlobalCategoryPage />,
      },
      {
        path: ROUTES.GLOBAL_PRODUCT,
        element: <ProductPage />,
      },
      // city local catalog
      { path: ROUTES.CITIESCATEGORIES, element: <CititesCategoriesPage /> },
      {
        path: ROUTES.CITY,
        element: <CityPage />,
      },
      {
        path: ROUTES.CITYCATEGORY,
        element: <CityCategory />,
      },
      {
        path: ROUTES.GLOBAL_PRODUCT1,
        element: <ProductPage />,
      },
    ],
  },
]);
