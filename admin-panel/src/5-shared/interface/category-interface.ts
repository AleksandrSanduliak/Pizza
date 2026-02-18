import { GlobalProduct } from "./global-product-interface";

export interface CategoryItem {
  id: number
  category: string;
  categoryTitle: string
  products: GlobalProduct[]
}

export type CreateCategoryFields = {
  categoryName: string;
};

export type CategoryTitles = Pick<CategoryItem, 'category' | 'categoryTitle'>