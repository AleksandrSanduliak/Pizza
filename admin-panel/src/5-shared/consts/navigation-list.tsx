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
    name: 'globalcatalog',
    to: ROUTES.CATEGORIES,
    label: 'Глобальный каталог товаров',
    icon: <ProductionQuantityLimitsIcon />,
  },
  {
    name: 'citycatalog',
    to: ROUTES.CITIESCATEGORIES,
    label: 'Каталоги городов',
    icon: <ProductionQuantityLimitsIcon />,
  },
];
