import console from 'console';

import axios from 'axios';
import { cookies } from 'next/headers';

import { CityInfo } from '@entities/city/city.schema';
import { CONFIG } from '@shared/consts/config';


export const getCityInfo = async (location:string): Promise<CityInfo | null> => {
  try {
    // const cookieStorie = cookies();
    // const location = (await cookieStorie).get('location')?.value;
    // if (!location) return null;
    console.log('start fetch');
    const response = await axios.get(`${CONFIG.backendUrl}/api/v1/city/cityInfo/${location}`);
    // const data = citySchema.safeParse(response);
    // if (!data.success) return null;
    // console.log('data', data);
    console.log('goods1 getCityInfo', response.data);
    return response.data;
  } catch (error) {
    console.log('error', error);
    throw error;
  }
};
const getUserData = async () => {
  const cookieStorie = cookies();
  const accessToken = (await cookieStorie).get('accessToken')?.value;
  console.log('accessToken', accessToken);
  if (!accessToken) return;
  console.log('startrefresh');
  const allCookies = (await cookies()).toString();
  const refresh = await refreshRequest(allCookies);
  console.log('refresh', refresh);
  return refresh;
};