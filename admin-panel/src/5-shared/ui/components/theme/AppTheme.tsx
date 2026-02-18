import { ThemeProvider as MuiThemeProvider, ThemeProvider } from '@mui/material/styles';
import type { ReactNode } from 'react';
import { customTheme } from '../../../consts/constants';
import { useTheme } from './ThemeSwitcher/useTheme';

const AppTheme = ({ children }: { children: ReactNode }) => {
  const { mode } = useTheme();

  return <MuiThemeProvider theme={customTheme(mode)}>{children}</MuiThemeProvider>;
};

export default AppTheme;
