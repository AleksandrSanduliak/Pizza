'use client';

import React from 'react';

import { UseCityList } from '@entities/city/api/cities-list';
import ChangeCity from '@features/change-city/change-city';

const SelectCityModal = () => {
  const { data: cityList, isLoading, isError, isFetching, error } = UseCityList();

  if (isLoading || isFetching) {
    return (
      <div className="inset-0 bg-white z-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto" />
          <p className="animate-pulse mt-4 text-gray-600">Загрузка городов...</p>
        </div>
      </div>
    );
  }
  if (isError) {
    console.error(error);
    return (
      <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-6">
        Произошла ошибка при запросе к серверу, повторите попытку позже.
      </div>
    );
  }
  return <ChangeCity cityList={cityList} currentCity="" isOpenModal={true} />;
};

export default SelectCityModal;
