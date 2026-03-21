export const ROUTES = {
  MAIN: '/',
  CITYCATALOG: '/citycatalog',
  GLOBAL_CATEGORIES: '/globalproducts/categories',
  GLOBAL_CATEGORY: '/globalproducts/categories/:category',
  GLOBAL_PRODUCT: '/globalproducts/categories/:category/:id',
  GLOBAL_PRODUCT1: '/citycatalog/categories/:category/:id',
  CITIESCATEGORIES: '/citycatalog/citiescategories',
  CITY: '/citycatalog/citiescategories/:city',
  CITYCATEGORY: '/citycatalog/citiescategories/:city/:category',
} as const;

export type PathParams = {
  [ROUTES.GLOBAL_CATEGORY]: {
    category: string;
  };

  [ROUTES.GLOBAL_PRODUCT]: {
    category: string;
    id: number;
  };

  [ROUTES.CITY]: {
    city: string;
  };

  [ROUTES.CITYCATEGORY]: {
    city: string;
    category: string;
  };
};

declare module 'react-router-dom' {
  interface Register {
    params: PathParams;
  }
}
