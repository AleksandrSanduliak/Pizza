export type MainProductItem = {
  id: number;
  title: string;
  caption: string;
  desc: string;
  imageUrl: string;
  category: string;
};

type NutritionFacts = {
  id: number;
  fats: number;
  proteins: number;
  carbs: number;
  calories: number;
  weight: number;
};

type ProductVariant = {
  title: string;
  sizeName: string;
  size: string;
  desc: string;
  nutritionFacts: NutritionFacts;
  variationId: string;
};

export interface GlobalProduct extends MainProductItem {
  variants?: ProductVariant[];
}

interface LocalProductVariant extends ProductVariant {
  price: number;
}

export interface LocalProduct extends MainProductItem, LocalProductVariant {
  order: number;
}
