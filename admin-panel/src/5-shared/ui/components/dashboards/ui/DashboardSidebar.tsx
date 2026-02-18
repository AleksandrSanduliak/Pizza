import { Box, List } from '@mui/material';
import type { JSX } from 'react';

const DashboardSidebar = ({
  drawerWidth = 240,
  renderProp,
}: {
  drawerWidth?: number;
  renderProp: () => JSX.Element[];
}) => {
  return (
    <Box
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        height: '100%',
        mr: 3,
      }}
    >
      <List>{renderProp()}</List>
    </Box>
  );
};

export default DashboardSidebar;
