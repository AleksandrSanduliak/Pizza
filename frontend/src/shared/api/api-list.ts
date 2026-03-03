import { CONFIG } from '@shared/consts/config';
import { isServer } from '@shared/consts/helpers';

export const baseUrl = () => {
  if (!isServer) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
  }
  return `${CONFIG.backendUrl}/api`;
};

export const AUTH_API_URL: string = `${baseUrl()}/v1/auth`;
export const REFRESH_API_URL: string = `${baseUrl()}/v1/auth/refresh`;
export const CITY_API_URL: string = `${baseUrl()}/v1/city`;
export const CITY_LIST_API_URL: string = `${baseUrl()}/v1/city/cityList`;
export const CITY_INFO_API_URL = (location: string): string =>
  `${baseUrl()}/v1/city/cityInfo/${location}`;
export const CITY_GOODS_API_URL = (location: string): string =>
  `${baseUrl()}/v1/city/cityCatalog/${location}`;
export const orderApiUrl: string = `${baseUrl()}/v1/order`;
export const goodsApiUrl: string = `${baseUrl()}/v1/goods`;
