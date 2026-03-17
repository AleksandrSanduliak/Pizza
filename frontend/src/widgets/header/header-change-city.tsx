'use client';
import React, { useState } from 'react';

import { UseCityList } from '@entities/city/api/cities-list';
import ChangeCityButton from '@features/change-city/ui/change-city-button';
import ChangeCityModal from '@features/change-city/ui/change-city-modal';
import CityList from '@features/change-city/ui/city-list';
import FetchCityLoader from '@features/change-city/ui/loaders/fetch-city-loader';

const HeaderCityList = ({ cityName }: { cityName: string }) => {
  const { data, isPending } = UseCityList();
  if (isPending) return <FetchCityLoader />;
  return <CityList currentCity={(cityName as string) ?? ''} data={data} />;
};

function HeaderChangeCity({
  cityName,
  isOpenModal = false,
}: {
  cityName: string;
  isOpenModal?: boolean;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(isOpenModal);

  return (
    <ChangeCityModal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      buttonSlot={<ChangeCityButton cityName={cityName} setIsOpen={setIsOpen} />}
      listSlot={<HeaderCityList cityName={cityName} />}
    />
  );
}
export default HeaderChangeCity;
