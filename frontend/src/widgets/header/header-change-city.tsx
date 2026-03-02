'use client';
import React from 'react';

import { UseCityList } from '@entities/city/api/cities-list';
import ChangeCity from '@features/change-city/change-city';
import ChangeCityButton from '@features/change-city/change-city-button';

const HeaderChangeCity = ({ currentCity }: { currentCity: string }) => {
  const { data: cityList } = UseCityList();
  return (
    <div>
      <ChangeCity
        cityList={cityList}
        currentCity={currentCity}
        renderPropButton={(setIsOpen) => (
          <ChangeCityButton currentCity={currentCity} setIsOpen={setIsOpen} />
        )}
      />
    </div>
  );
};

export default HeaderChangeCity;
