'use client';
import React from 'react';

import { useRouter } from 'next/navigation';

import cn from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';

import ConvertStrSvgToComponent from 'atoms/ConvertStrSvgToComponent/ConvertStrSvgToComponent';
import Logo from 'atoms/Logo/Logo';
import { useAppSelector } from 'store/hooks';
import { categories } from 'utils/data/categories';
import useDraggableScroll from 'utils/hooks/ui/useDraggableScroll';

import { headerAnim, logoHeaderAnimation } from './animations';
import cl from './HeaderNavigation.module.scss';

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

const NavigationItem = ({
  name,
  img,
  path,
}: {
  name: string;
  img: string | undefined;
  path: string;
}) => {
  const router = useRouter();
  const onClickHeaderNavItem = () => {
    router.push(`/#${path}`);
  };
  return (
    <li className={cl.navItem} onClick={onClickHeaderNavItem}>
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
        <NavigationItem
          key={category.name}
          name={category.name}
          img={category.img}
          path={category.path}
        />
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
