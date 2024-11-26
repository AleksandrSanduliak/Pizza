export interface ICityInfo {
  name: string;
  title: string;
  url: string;
}

export const cityInfo: ICityInfo[] = [
  {
    name: 'moscow',
    title: 'Москва',
    url: `${import.meta.env.VITE_CLIENT_URL}/moscow`,
  },
  {
    name: 'stpetersburg',
    title: 'Санкт-Петербург',
    url: `${import.meta.env.VITE_CLIENT_URL}/stpetersburg`,
  },
];
