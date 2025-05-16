import { TFoodItem } from 'utils/types/types';

import { TAddToCart } from '../types';

interface ICardVariant {
  foodItem: TFoodItem;
  addToCart: TAddToCart;
}

interface ICardWithModal {
  isShowModal: boolean;
  addToCart: TAddToCart;
  handleOpenModal: () => void;
  handleCloseModal: () => void;
}

interface ICardItemHeader {
  isShowModal: boolean;
  handleCloseModal: () => void;
}
