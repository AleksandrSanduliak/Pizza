import dynamic from 'next/dynamic';

import SelectCityModal from '@features/change-city/select-city-modal';

const Logo = dynamic(() => import('@shared/ui/logo/logo-component'), {
  loading: () => <div className="text-center py-4">Загрузка логотипа...</div>,
  ssr: true,
});

export default async function SelectCityPage() {
  return (
    <div className="selectcity__container w-[100%]">
      <div className="pt-6">
        <Logo />
      </div>
      <SelectCityModal />
    </div>
  );
}
