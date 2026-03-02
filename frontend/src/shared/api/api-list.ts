import { CONFIG } from '@shared/consts/config';
import { isServer } from '@shared/consts/helpers';

export const baseUrl = () => {
  if (!isServer) {
    return `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
  }
  return `${CONFIG.backendUrl}/api`;
};

export const AUTH_API_URL = `${baseUrl()}/v1/auth`;
export const CITY_API_URL = `${baseUrl()}/v1/city`;
export const CITY_LIST_API_URL = `${baseUrl()}/v1/city/cityList`;
export const REFRESH_API_URL = `${baseUrl()}/v1/auth/refresh`;
export const orderApiUrl = `${baseUrl()}/v1/order`;
export const goodsApiUrl = `${baseUrl()}/v1/goods`;
