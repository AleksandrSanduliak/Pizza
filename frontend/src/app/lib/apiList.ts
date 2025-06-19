const baseUrl = `${process.env.NEXT_PUBLIC_SERVER_URL}/api`;
console.log('baseUr', baseUrl);
export const authApiUrl = `${baseUrl}/auth`;
export const orderApiUrl = `${baseUrl}/order`;
export const goodsApiUrl = `${baseUrl}/goods`;
