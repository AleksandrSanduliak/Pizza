import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import { Link } from 'react-router';

import { NAVIGATION_LIST } from '@shared/consts/navigation-list';
import { ReactNode } from 'react';
import DashboardComponent from '../ui/DashboardComponent';
import DashboardHeader from '../ui/DashboardHeader';
import DashboardSidebar from '../ui/DashboardSidebar';

export default function StandartDashboard({ children }: { children: ReactNode }) {
  return (
    <DashboardComponent
      headerSlot={<DashboardHeader />}
      sidebarSlot={
        <DashboardSidebar
          renderProp={() =>
            NAVIGATION_LIST.map((item) => (
              <ListItem key={item.name} disablePadding>
                <ListItemButton sx={{ p: '0.2rem' }} component={Link} to={item.to}>
                  <ListItemIcon>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))
          }
        />
      }
    >
      {children}
    </DashboardComponent>
  );
}
