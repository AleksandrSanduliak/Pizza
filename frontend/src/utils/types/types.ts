type fade = {
  isClicked: boolean;
};

// FORMS
export type FormLogin = {
  email: string;
  password: string;
};

export type FormRegister = {
  name: string;
  email: string | null;
  phone: number;
  dateBrith: Date;
  password: string;
  confirmPassword: string;
};

export type pizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating?: number;
  desc?: string;
};
export type foodType = {
  food: pizzaItem;
};
