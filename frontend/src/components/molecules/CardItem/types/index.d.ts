import { TFoodItem } from 'utils/types/types';

export type TAddToCart = (e: React.MouseEvent<Element, MouseEvent>, foodItem: TFoodItem) => void;
