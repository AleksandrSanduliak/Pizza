const baseUrl = import.meta.env.VITE_SERVER_URL;
console.log('baseUrl', baseUrl);
const createUrl = (url: string) => `${baseUrl}${url}`;

const apiUrl = {
  getGlobalProducts: createUrl('/api/v1/admin-panel/getGlobalProducts'),
  getGlobalProduct: createUrl('/api/v1/admin-panel/getGlobalProduct'),
  getGlobalCategories: createUrl('/api/v1/admin-panel/getGlobalCategories'),
  createCategory: createUrl('/api/v1/admin-panel/createCategory'),
  createGlobalProduct: createUrl('/api/v1/admin-panel/createGlobalProduct'),
  updateGlobalProduct: createUrl('/api/v1/admin-panel/updateGlobalProduct'),
  deleteGlobalProduct: createUrl('/api/v1/admin-panel/deleteGlobalProduct'),
  getCategory: createUrl('/api/v1/admin-panel/getCategory'),
  getCitiesList: createUrl('/api/v1/admin-panel/getCitiesList'),
  createCity: createUrl('/api/v1/admin-panel/createCity'),
  getCity: createUrl('/api/v1/admin-panel/getCity'),
  createLocalCategory: createUrl('/api/v1/admin-panel/createLocalCategory'),
  createLocalProduct: createUrl('/api/v1/admin-panel/createLocalProduct'),
  deleteLocalProduct: createUrl('/api/v1/admin-panel/deleteLocalProduct'),
};

export default apiUrl;
