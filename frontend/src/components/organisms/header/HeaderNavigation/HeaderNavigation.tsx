import React from 'react';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import ConvertStrSvgToComponent from 'atoms/ConvertStrSvgToComponent/ConvertStrSvgToComponent';
import Logo from 'atoms/logo/Logo';
import { categories, TCategories } from 'utils/data/categories';
import { useAppSelector } from 'utils/hooks/redux';
import useDraggableScroll from 'utils/hooks/ui/useDraggableScroll';

import cl from './HeaderNavigation.module.scss';

const logoHeaderAnimation = {
  initial: { marginLeft: -38 },
  animate: { marginLeft: 0 },
  exit: { marginLeft: -38 },
  transition: { duration: 0.2, ease: 'easeInOut' },
};

const headerAnim = {
  transition: { duration: 0.2, ease: 'easeInOut' },
};

const NavigationLogo = () => {
  const isVisible = useAppSelector((store) => store.reducer.isVisible.isVisible);

  return (
    <AnimatePresence>
      {isVisible && ( // доступен если произошел скролл ниже header navigation, без logoLetters */}
        <Logo
          key="navigationLogo"
          logoType="fixedHeader"
          isHidden={true}
          targetToHidden="logoLetters"
          animations={logoHeaderAnimation}
        />
      )}
    </AnimatePresence>
  );
};

const NavigationItem = ({ category }: { category: TCategories }) => {
  const { name, img } = category;

  return (
    <li className={cl.navItem}>
      {img && (
        <ConvertStrSvgToComponent
          alt={`Иконка категории ${name}`}
          width={24}
          height={24}
          className={cl.navImg}
          strSvg={img as string}
          draggable={false}
        />
      )}
      <p className={cn('bigtext', cl.navText)}>{name}</p>
    </li>
  );
};

const NavigationList = () => {
  const draggableElementRef = React.useRef<HTMLUListElement>(null);
  const { events } = useDraggableScroll(draggableElementRef);

  return (
    <motion.ul
      layoutScroll
      ref={draggableElementRef}
      animate={headerAnim}
      {...events}
      className={cl.navList}>
      <NavigationLogo />
      {categories.map((category) => (
        <NavigationItem key={category.name} category={category} />
      ))}
    </motion.ul>
  );
};

const HeaderNavigation = () => {
  const isVisible = useAppSelector((store) => store.reducer.isVisible.isVisible);
  return (
    <section className={cl.headerNavigation}>
      <div className={cl.headerNavigationWrapper}>
        <motion.div
          layoutRoot
          className={cn(cl.fixedHeaderWrapper, {
            [`fixed-header & ${cl.fixedHeaderWrapper}`]: isVisible,
          })}>
          <motion.div className="headerNavigation__container">
            <NavigationList />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeaderNavigation;
