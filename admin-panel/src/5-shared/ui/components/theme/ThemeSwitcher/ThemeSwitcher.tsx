import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { Box } from '@mui/material';
import { Theme } from '../../../../consts/constants';
import cl from './ThemeSwitcher.module.scss';
import { useTheme } from './useTheme';
const ToggleButton = ({ children }: { children: React.ReactNode }) => {
  const { toggleTheme } = useTheme();

  return <div onClick={() => toggleTheme()}>{children}</div>;
};

const ThemeSwitcher = () => {
  const { mode } = useTheme();

  return (
    <div className={cl.toggle}>
      <ToggleButton>{mode === Theme.Light ? <LightModeIcon /> : <DarkModeIcon />}</ToggleButton>
    </div>
  );
};

export default ThemeSwitcher;
