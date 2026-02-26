const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
console.log('baseUr', baseUrl);
export const AUTH_API_URL = `${baseUrl}/v1/auth`;
export const CITY_API_URL = `${baseUrl}/v1/city`;
export const orderApiUrl = `${baseUrl}/v1/order`;
export const goodsApiUrl = `${baseUrl}/v1/goods`;
