import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { ROUTES } from './routes';

type TNavigationItem = {
  name: string;
  to: string;
  label: string;
  icon: React.ReactElement;
};

interface INavigationList extends TNavigationItem {
  childrens?: TNavigationItem[];
}
export const NAVIGATION_LIST: INavigationList[] = [
  {
    name: 'citycatalog',
    to: ROUTES.CITYCATALOG,
    label: 'Каталоги городов',
    icon: <ProductionQuantityLimitsIcon />,
    // childrens: [
    //   {
    //     name: 'globalproducts',
    //     to: 'globalproducts',
    //     label: 'Глобальные продукты',
    //     icon: <MenuBookIcon />,
    //   },
    // ],
  },
  // { name: 'profile', to: 'profile', label: 'Profile', icon: <PersonIcon /> },
  // { name: 'categories', to: 'citycatalog/categories', label: 'categories', icon: <PersonIcon /> },
  // { name: 'settings', to: 'settings', label: 'Settings', icon: <SettingsIcon /> },
];
