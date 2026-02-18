import type { LinkProps } from '@mui/material/Link';
import { createTheme } from '@mui/material/styles';
import LinkBehavior from '../ui/components/LinkBehavior';

export const Theme = {
  Dark: 'dark',
  Light: 'light',
} as const;
export type Theme = (typeof Theme)[keyof typeof Theme];
export const customTheme = (mode: Theme) =>
  createTheme({
    palette: {
      mode,
      ...(mode === Theme.Dark
        ? {
          primary: { main: '#64b5f6' }, // Blue 300 — мягкий, читаемый на тёмном фоне
          secondary: { main: '#42a5f5' }, // Blue 400 — чуть насыщеннее
          background: { default: '#0f172a', paper: '#1e293b' }, // slate-900 / slate-800
          text: { primary: '#f1f5f9', secondary: '#cbd5e1' },
          divider: 'rgba(255, 255, 255, 0.12)',
        }
        : {
          primary: { main: '#1e88e5' }, // Blue 600 — классический корпоративный синий
          secondary: { main: '#2196f3' }, // Blue 500 — стандартный Material Blue
          background: { default: '#ffffff', paper: '#f8fafc' }, // very light blue-grey (slate-50)
          text: { primary: '#0f172a', secondary: '#475569' },
          divider: 'rgba(0, 0, 0, 0.12)',
        }),
    },
    transitions: {
      duration: {
        shortest: 150,
        shorter: 200,
        short: 250,
        standard: 300,
        complex: 375,
        enteringScreen: 225,
        leavingScreen: 195,
      },
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 960,
        lg: 1280,
        xl: 1920,
      },
    },
    components: {
      MuiLink: {
        defaultProps: {
          component: LinkBehavior,
        } as LinkProps,
      },
      MuiButtonBase: {
        defaultProps: {
          LinkComponent: LinkBehavior,
        },
      },
    },

    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
  });

export const variantItem = {
  title: '',
  desc: '',
  size: '',
  sizeName: '',
  nutritionFacts: {
    fats: null,
    proteins: null,
    carbs: null,
    calories: null,
    weight: null,
  },
};