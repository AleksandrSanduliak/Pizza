import console from 'console';

import axios from 'axios';
import { cookies } from 'next/headers';

import { City, citySchema } from '@entities/city/city.schema';
import { CONFIG } from '@shared/consts/config';

export const getCityInfo = async (): Promise<City | null> => {
  try {
    const cookieStorie = cookies();
    const location = (await cookieStorie).get('location')?.value;
    if (!location) return null;
    console.log('start fetch');
    const goods = await axios.get(`${CONFIG.backendUrl}/api/v1/goods/${location}`);
    const data = citySchema.safeParse(goods);
    if (!data.success) return null;
    console.log('data', data);
    console.log('goods1', goods.data);
    return goods.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
export const getCityInfoByParams = async (city: string): Promise<City | null> => {
  try {
    const goods = await axios.get(`${CONFIG.backendUrl}/api/v1/goods/${city}`);
    // const data = citySchema.safeParse(goods);
    console.log('goods', goods);
    // console.log('data', data);
    // if (!data.success) throw data.error;
    // console.log('data', data);
    console.log('goods1', goods.data);
    return goods.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
