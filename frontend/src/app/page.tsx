import { getCityList } from '@entities/city/api/cities-list';
import ChangeCityModal from '@features/change-city/ui/change-city-modal';
import CityList from '@features/change-city/ui/city-list';
import Logo from '@shared/ui/logo/Logo';

export default async function SelectCityPage() {
  const response = await getCityList();
  return (
    <div className="selectcity__container w-[100%]">
      <div className="pt-6">
        <Logo />
      </div>

      <ChangeCityModal isOpen={true} listSlot={<CityList data={response} currentCity={null} />} />
    </div>
  );
}
