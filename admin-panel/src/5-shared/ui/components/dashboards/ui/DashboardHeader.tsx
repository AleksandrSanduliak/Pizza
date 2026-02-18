import { AppBar, Toolbar, Typography } from '@mui/material';
import ThemeSwitcher from '../../theme/ThemeSwitcher/ThemeSwitcher';
import cl from './Dashboard.module.scss';
const DashboardHeader = () => {
  return (
    <AppBar position='static' sx={{ mb: 3 }}>
      <Toolbar className={cl.toolbar}>
        <Typography>ToTo Pizza admin panel</Typography>
        <Typography>
          <ThemeSwitcher />
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
