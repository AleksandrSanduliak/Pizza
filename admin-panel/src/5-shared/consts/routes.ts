
export const ROUTES = {
  MAIN: '/',
  CITYCATALOG: '/citycatalog',
  CATEGORIES: '/globalproducts/categories',
  CATEGORY: '/globalproducts/categories/:category',
  PRODUCT: '/citycatalog/categories/:category/:id',
  CITIESCATEGORIES: '/citycatalog/citiescategories',
  CITY: '/citycatalog/citiescategories/:city',
  CITYCATEGORY: '/citycatalog/citiescategories/:city/:category',
} as const

export type PathParams = {
  [ROUTES.CATEGORY]: {
    category: string
  }

  [ROUTES.PRODUCT]: {
    category: string
    id: number
  }

  [ROUTES.CITY]: {
    city: string
  }

  [ROUTES.CITYCATEGORY]: {
    city: string
    category: string
  }
}

declare module "react-router-dom" {
  interface Register {
    params: PathParams
  }
}

