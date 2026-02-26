import dynamic from 'next/dynamic';

import { getCityInfoByParams } from '@app/actions/getCityInfo';
import { CONFIG } from '@shared/consts/config';
import { CityData } from '@shared/interfaces/city';
import FullScreenLoader from '@shared/ui/Loaders/FullScreenLoader/FullScreenLoader';

const CardSections = dynamic(() => import('@widgets/card-sections/card-sections'), {
  loading: () => <FullScreenLoader />,
  ssr: true,
});

export default async function MainPage({ params }: { params: Promise<{ slug: string }> }) {
  const { city } = await params;
  const cityStr = city.toString();
  const cityData = await getCityInfoByParams(cityStr);
  const categories = cityData?.categories ?? [];
  console.log('params', cityStr);
  console.log('cityData', cityData);
  // console.log('categories', categories);
  return (
    <>
      <CardSections data={categories} />
    </>
  );
}

export async function generateStaticParams() {
  const cityList = await fetch(`${CONFIG.backendUrl}/api/v1/city/cityList`).then((res) =>
    res.json(),
  );
  console.log('posts', cityList);

  const params = await Promise.all(
    cityList.map(async (cityData: CityData) => {
      // Получаем данные для каждого города
      const cityInfo = await getCityInfoByParams(cityData.city.toString());

      return {
        city: cityData.city.toString(),
        // Можно добавить дополнительные параметры если нужно
        ...cityInfo,
      };
    }),
  );
  return params;
}
