import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import { CssBaseline } from '@mui/material';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import { router } from '@app/routes';
import AppTheme from './5-shared/ui/components/theme/AppTheme';
import { ThemeProvider } from './5-shared/ui/components/theme/ThemeSwitcher/useTheme';

const queryClient = new QueryClient();
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AppTheme>
          <CssBaseline />
          <RouterProvider router={router} />
        </AppTheme>
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
