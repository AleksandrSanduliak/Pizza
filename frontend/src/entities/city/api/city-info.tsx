import { CityInfo, citySchema } from '@entities/city/model/city.schema';
import { CITY_INFO_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';

export const getCityInfo = async (location: string): Promise<CityInfo | null> => {
  try {
    console.log('start fetch');
    const response = await axiosInstance.get(CITY_INFO_API_URL(location), {
      withCredentials: false,
    });
    // console.log('response', response);
    const data = citySchema.safeParse(response?.data);
    console.log('getcityInfo', data);
    if (!data.success) throw new Error('Информация о городе не получена');
    console.log('data', data);
    console.log('goods1 getCityInfo', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
