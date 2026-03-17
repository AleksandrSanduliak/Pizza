import { ReactNode, Suspense } from 'react';

import { getCityList } from '@entities/city/api/cities-list';
import { getCityInfo } from '@entities/city/api/city-info';
import { CityItem } from '@entities/city/model/city-list-schema';
import Footer from '@widgets/footer/footer';
import { Header } from '@widgets/header';

export default async function MainPageLayout({
  params,
  children,
}: {
  params: Promise<{ city: string }>;
  children: ReactNode;
}) {
  console.log('params main page layout', await params);
  const { city } = await params;
  console.log('city params', city);
  const cityData = await getCityInfo(city);
  console.log('cityData', cityData);
  return (
    <>
      <div className="wrapper">
        {/* <Suspense fallback={<div>...loading header</div>}>
          <Header cityName={cityData.name as string} />
        </Suspense> */}
        <main className="main ">
          <div className="mainpage_container"> {children}</div>
        </main>
        {/* <Footer /> */}
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
