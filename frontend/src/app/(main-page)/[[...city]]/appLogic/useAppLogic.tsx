import useAppNavigation from './hooks/useAppNavigation/useAppNavigation';
import useAuthUser from './hooks/useAuthUser';
import useGoods from './hooks/useGoods';

const appHooks = [useAppNavigation, useAuthUser, useGoods];
const useAppLogic = () => {
  return appHooks.forEach((hook) => hook());
};

export default useAppLogic;
