import { ROUTES } from '@/5-shared/consts/routes';
import { ListItem, ListItemButton } from '@mui/material';

import { Link } from 'react-router';

const CityCatalog = () => {
  return (
    <div>
      <ListItem>
        <ListItemButton sx={{ p: '0.2rem' }} component={Link} to={ROUTES.CATEGORIES}>
          Управлениями категориями товаров
        </ListItemButton>
        <ListItemButton sx={{ p: '0.2rem' }} component={Link} to={ROUTES.CITIESCATEGORIES}>
          Управлениями каталогами городов
        </ListItemButton>
      </ListItem>
    </div>
  );
};

export default CityCatalog;
