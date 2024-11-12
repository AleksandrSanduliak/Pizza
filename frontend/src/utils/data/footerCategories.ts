export type TDataItem = {
  anchor: string;
  text: string;
};
interface IfooterCat {
  Kudapizza: {
    title: string;
    data: TDataItem[];
  };
  Help: {
    title: string;
    data: TDataItem[];
  };
}
export const footerCategories: IfooterCat = {
  Kudapizza: {
    title: 'Куда Пицца',
    data: [
      {
        anchor: 'about',
        text: 'О компании',
      },
      {
        anchor: 'agreement',
        text: 'Пользовательское соглашение',
      },
      {
        anchor: 'guarantees',
        text: 'Условия гарантии',
      },
    ],
  },
  Help: {
    title: 'Помощь',
    data: [
      {
        anchor: 'restaurant',
        text: 'Ресторан',
      },
      {
        anchor: 'contacts',
        text: 'Контакты',
      },
      {
        anchor: 'help',
        text: 'Поддержка',
      },
      {
        anchor: 'trackorder',
        text: 'Отследить заказ',
      },
    ],
  },
};
