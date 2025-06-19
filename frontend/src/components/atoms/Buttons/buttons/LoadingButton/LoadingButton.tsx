import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import BaseButton from 'atoms/Buttons/BaseButton';

import cl from './LoadingButton.module.scss';

interface ILoadingButton {
  children: string;
  isLoading: boolean;
}

const textAnimations = {
  visible: { opacity: 1, transition: { duration: 0.3 } },
  hidden: { opacity: 0, transition: { duration: 0.3 } },
};

const imgAnimations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.3 },
};

const LoadingButton = ({ children, isLoading }: ILoadingButton) => {
  return (
    <BaseButton buttonMode="primary" type="submit" className={cl.loadingButton}>
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.img
            {...imgAnimations}
            key="loadingImg"
            loading="lazy"
            className={cn({ [cl.loadingImg]: isLoading })}
            src="public/icons/loading.svg"
            alt="Загрузка..."
          />
        )}
      </AnimatePresence>
      <motion.span
        key="loadingChildren"
        variants={textAnimations}
        animate={isLoading ? 'hidden' : 'visible'}>
        {children}
      </motion.span>
    </BaseButton>
  );
};

export default LoadingButton;
