import { Theme } from '../consts/constants';

export const getLocalStorageValue = (key: string) => localStorage.getItem(key) as string;
export const setLocalStorageValue = (key: string, value: string) =>
  localStorage.setItem(key, value);

export const getThemeValue = () => {
  const getItem = getLocalStorageValue('theme');
  if (!getItem) {
    setLocalStorageValue('theme', Theme.Light);
    return Theme.Light;
  }

  return getItem as Theme;
};

export const setThemeValue = (theme: Theme) => {
  if (!theme) return console.error('Theme не передан в функцию');
  setLocalStorageValue('theme', theme);
};
