import { createTheme } from '@mui/material';
import { LinkProps } from '@mui/material/Link';
import React from 'react';
import { Link as RouterLink, type LinkProps as RouterLinkProps } from 'react-router';

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});
export default LinkBehavior;
