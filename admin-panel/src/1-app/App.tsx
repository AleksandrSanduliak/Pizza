import { Box, CircularProgress } from '@mui/material';
import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router';

const StandartDashboard = lazy(
  () => import('@shared/ui/components/dashboards/StandartDashboard/StandartDashboard')
);

const App = () => {
  return (
    <StandartDashboard>
      <Suspense
        fallback={
          <Box display='flex' justifyContent='center' mt={5} alignItems='start'>
            <CircularProgress />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </StandartDashboard>
  );
};

export default App;
