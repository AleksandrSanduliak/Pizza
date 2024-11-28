import Settings from 'pages/Settings';
import RequireAuth from 'utils/hoc/RequireAuth';

export const staticRoutes: { path: string; component: JSX.Element }[] = [
  {
    path: 'settings',
    component: (
      <RequireAuth>
        <Settings />
      </RequireAuth>
    ),
  },
];
