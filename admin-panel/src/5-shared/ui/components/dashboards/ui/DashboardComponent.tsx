import { Box, Container } from '@mui/material';
import { ReactNode } from 'react';

const DashboardComponent = ({
  headerSlot,
  sidebarSlot,
  children,
}: {
  headerSlot: ReactNode;
  sidebarSlot: ReactNode;
  children: ReactNode;
}) => {
  return (
    <Container
      maxWidth='xl'
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
      }}
      disableGutters
    >
      {headerSlot}
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          height: '100%',
          flex: '1 1 100%',
          // padding: '1rem',
          paddingX: '1rem',
          paddingBottom: '1rem',
        }}
      >
        {sidebarSlot}
        <Box sx={{ flexGrow: 1 }}>{children}</Box>
      </Box>
    </Container>
  );
};

export default DashboardComponent;
