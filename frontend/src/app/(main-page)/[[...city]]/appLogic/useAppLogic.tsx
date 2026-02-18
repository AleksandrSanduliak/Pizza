import useAppNavigation from './hooks/useAppNavigation/useAppNavigation';
import useAuthUser from './hooks/useAuthUser';

const appHooks = [useAppNavigation, useAuthUser];
const useAppLogic = () => {
  return appHooks.forEach((hook) => hook());
};

export default useAppLogic;
