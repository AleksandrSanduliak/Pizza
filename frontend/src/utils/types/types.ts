// FORMS
export type FormLogin = {
  email: string | null;
  password: string;
};

export type FormRegister = {
  name: string;
  phone: number;
  dateBrith: Date;
  confirmPassword: string;
} & FormLogin;

export type orderForm = {
  name: string;
  phone: string | null;
  email: number;
  deliveryType: string;

  street: string;
  house: string;
  entrance: number;
  floor: number;
  apartment: number;
  intercom: number;
  whenOrderBeFilled: string;
  payment: string;
  shortChange: string; // сдача
};

export type pizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  oldprice?: number;
  labeltype?: number | undefined;
  category: number;
  rating?: number;
  desc?: string;
  count?: number;
  totalPrice?: number;
  disabled?: boolean;
};

export type foodType = {
  food: pizzaItem;
};
