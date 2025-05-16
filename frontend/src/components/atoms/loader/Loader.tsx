import cn from 'classnames';
import { createPortal } from 'react-dom';

import cl from './loader.module.scss';

const loaderRoot = document.getElementById('fullscreen-loader-root');
const FullScreenLoader = () => {
  return createPortal(<div className={cn(cl.loader)} />, loaderRoot!);
};

export default FullScreenLoader;
