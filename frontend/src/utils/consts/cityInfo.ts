export interface ICityInfo {
  name: string;
  city: string;
  title: string;
  url: string;
}

export const cityInfo: ICityInfo[] = [
  {
    name: 'moscow',
    city: 'moscow',
    title: 'Москва',
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/moscow`,
  },
  {
    name: 'stpetersburg',
    city: 'stpetersburg',
    title: 'Санкт-Петербург',
    url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/stpetersburg`,
  },
];
