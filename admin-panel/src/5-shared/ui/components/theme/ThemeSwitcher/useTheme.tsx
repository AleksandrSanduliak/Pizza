import React, { createContext, useCallback, useContext, useState } from 'react';
import { Theme } from '../../../../consts/constants';
import { getThemeValue, setThemeValue } from '../../../../utils/getLocalStorageValue';

interface IThemeContext {
  mode: Theme;
  toggleTheme: () => void;
}

const ThemeContext = createContext<IThemeContext | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<Theme>(() => getThemeValue());

  React.useEffect(() => {
    setThemeValue(mode);
  }, [mode]);

  const toggleTheme = useCallback(() => {
    setMode((prev) => (prev === Theme.Light ? Theme.Dark : Theme.Light));
  }, []);

  return <ThemeContext.Provider value={{ mode, toggleTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};
