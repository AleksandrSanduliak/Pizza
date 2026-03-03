import { Categories, categoriesSchema } from '@entities/city/model/city.schema';
import { CITY_GOODS_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';

export const getCityCategories = async (city: string): Promise<Categories | []> => {
  try {
    const goods = await axiosInstance.get(CITY_GOODS_API_URL(city), { withCredentials: false });
    const validate = categoriesSchema.safeParse(goods?.data);
    if (!validate.success) return [];
    return validate.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
