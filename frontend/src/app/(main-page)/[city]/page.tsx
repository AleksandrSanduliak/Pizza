import { getCityList } from '@entities/city/api/cities-list';
import { getCityCategories } from '@entities/city/api/city-categories';
import { CityItem } from '@entities/city/model/city-list-schema';
import { Categories } from '@entities/city/model/city.schema';
import CardSections from '@widgets/card-sections/card-sections';

export default async function MainPage({ params }: { params: Promise<{ city: Categories }> }) {
  const { city } = await params;
  console.log('params', city);
  const cityStr = city.toString();
  const cityData = await getCityCategories(cityStr);
  console.log('cityData', cityData);
  const categories = cityData ?? [];
  return (
    <>
      <CardSections data={categories} />
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
