import { useQuery } from '@tanstack/react-query';

import { CityList, cityListSchema } from '@entities/city/model/city-list-schema';
import { CITY_LIST_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';

const validation = (response) => {
  if (!response?.data || response?.data?.length === 0)
    throw Error('Ошибка получения данных списка городов');
  const validation = cityListSchema.safeParse(response?.data);
  console.log('validation', validation);
  return validation;
};

const request = async (): Promise<CityList | undefined> => {
  const cityListResponse = await axiosInstance(CITY_LIST_API_URL, {
    withCredentials: false,
  });
  console.log('cityListResponse', cityListResponse);
  const validate = validation(cityListResponse);
  if (!validate.success) {
    throw Error(validate.toString());
  }
  return validate.data;
};

export const UseCityList = () => {
  return useQuery({
    queryKey: [],
    queryFn: async (): Promise<CityList | undefined> => {
      return request();
    },
    retry: false,
  });
};

export const getCityList = async () => {
  return request();
};
