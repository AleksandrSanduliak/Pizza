import console from 'console';

import { ReactNode } from 'react';

import { getCityInfo } from '@app/actions/getCityInfo';
import { getCityList } from '@entities/city/api/cities-list';
import { CityItem, CityList } from '@entities/city/model/city-list-schema';
import Footer from '@widgets/footer/footer';
import { Header } from '@widgets/header';

export default async function MainPageLayout({ params, children }: { children: ReactNode }) {
  console.log('params main page layout', await params);
  const { city } = await params;
  const cityData = await getCityInfo(city);
  console.log('cityData', cityData);
  return (
    <>
      <div className="wrapper">
        <Header data={cityData} />
        <main className="main">{children}</main>
        <Footer />
      </div>
    </>
  );
}

export async function generateStaticParams() {
  const cityList = await getCityList();
  if (!cityList) throw new Error('Ошибка получения городов');

  return cityList.map((item: CityItem) => {
    return { city: item.city };
  });
}
