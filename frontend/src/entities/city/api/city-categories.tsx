import axios from 'axios';

import { Categories } from '@entities/city/city.schema';
import { CONFIG } from '@shared/consts/config';

export const getCityCategories = async (city: string): Promise<Categories | null> => {
  try {
    const goods = await axios.get(`${CONFIG.backendUrl}/api/v1/city/citycatalog/${city}`);
    console.log('goods', goods);
    // const data = categoriesSchema.safeParse(goods);
    // console.log('data', data);
    // if (!data.success) throw data.error;
    // console.log('data', data);
    console.log('goods1 getCityInfoByParams', goods.data);
    return goods.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
