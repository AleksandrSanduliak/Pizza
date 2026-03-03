import dynamic from 'next/dynamic';
import { Suspense } from 'react';

import { getCityList } from '@entities/city/api/cities-list';
import { getCityCategories } from '@entities/city/api/city-categories';
import { CityItem } from '@entities/city/model/city-list-schema';
import { Categories } from '@entities/city/model/city.schema';

const CardSections = dynamic(() => import('@widgets/card-sections/card-sections'), {
  loading: () => <div>...loading</div>,
  ssr: true,
});

export default async function MainPage({ params }: { params: Promise<{ city: Categories }> }) {
  const { city } = await params;
  console.log('params', city);
  const cityStr = city.toString();
  const cityData = await getCityCategories(cityStr);
  console.log('cityData', cityData);
  const categories = cityData ?? [];
  return (
    <>
      <Suspense fallback={<div>...loading categories</div>}>
        <CardSections data={categories} />
      </Suspense>
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
