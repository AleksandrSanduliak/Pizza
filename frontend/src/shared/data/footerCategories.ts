export type TDataItem = {
  anchor: string;
  text: string;
};

interface IFooterCat {
  title: string;
  data: TDataItem[];
}

export const footerCategories: IFooterCat[] = [
  {
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
  {
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
];
