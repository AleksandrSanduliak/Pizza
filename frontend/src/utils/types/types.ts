// FORMS
export type TLoginFormFields = {
  name: string;
  title: string;
};

export interface IRegisterFormFields extends TLoginFormFields {
  isRegisterMask?: boolean;
  maskOptions?: object;
  mask?: string | string[];
  type?: string;
}

export type TFoodItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number[];
  oldprice?: number;
  labeltype?: number | undefined;
  category: number;
  rating?: number;
  desc?: string;
  count: number;
  totalPrice: number;
  disabled?: boolean;
};

type fooditem = {
  id: number;
  title: string;
  desc: string;
  items: Array<{
    productId: number;
    title: string;
    desc: string;
    price: number;
    oldprice: number | null;
    image: string;
    stoplisted: boolean;
    nutrition_facts: {
      fats: string;
      proteins: string;
      carbs: string;
      calories: string;
      joules: string;
    };
    size: number;
    types: number[];
    url: string;
    weight: number;
  }>;
};

export type TFoodCategoryInfo = {
  title: string;
  anchor: string;
  name: string;
  items: TFoodItem[];
};

export type TGoodsData = TFoodCategoryInfo[];
