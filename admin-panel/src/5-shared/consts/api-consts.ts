const baseUrl = import.meta.env.VITE_SERVER_URL;
console.log('baseUrl', baseUrl);
const createUrl = (url: string) => `${baseUrl}${url}`;

const apiUrl = {
  getGlobalProducts: createUrl('/api/v1/global-product/getGlobalProducts'),
  getGlobalProduct: createUrl('/api/v1/global-product/getGlobalProduct'),
  getGlobalCategories: createUrl('/api/v1/global-product/getGlobalCategories'),
  createCategory: createUrl('/api/v1/global-product/createGlobalCategory'),
  createGlobalProduct: createUrl('/api/v1/global-product/createGlobalProduct'),
  updateGlobalProduct: createUrl('/api/v1/global-product/updateGlobalProduct'),
  deleteGlobalProduct: createUrl('/api/v1/global-product/deleteGlobalProduct'),
  getCategory: createUrl('/api/v1/global-product/getGlobalCategory'),
  getCitiesList: createUrl('/api/v1/local-catalogs/getCitiesList'),
  createCity: createUrl('/api/v1/local-catalogs/createCity'),
  getCity: createUrl('/api/v1/local-catalogs/getCity'),
  createLocalCategory: createUrl('/api/v1/local-catalogs/createLocalCategory'),
  createLocalProduct: createUrl('/api/v1/local-catalogs/createLocalProduct'),
  deleteLocalProduct: createUrl('/api/v1/local-catalogs/deleteLocalProduct'),
};

export default apiUrl;
