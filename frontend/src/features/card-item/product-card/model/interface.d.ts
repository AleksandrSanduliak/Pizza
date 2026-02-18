interface ICardItemHeader {
  isShowModal: boolean;
  handleCloseModal: () => void;
}
export type TAddToCart = (e: React.MouseEvent<Element, MouseEvent>, foodItem: TFoodItem) => void;
