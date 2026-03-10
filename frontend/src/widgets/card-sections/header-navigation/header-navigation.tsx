'use client';

import cn from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import React from 'react';

import { Categories } from '@entities/city/model/city.schema';
import { userMenuSlice } from '@entities/user-menu/user-menu.slice';
import { useAppSelector } from '@shared/store/hooks';
import ConvertStrSvgToComponent from '@shared/ui/ConvertStrSvgToComponent/ConvertStrSvgToComponent';
import Logo from '@shared/ui/logo/Logo';
import { headerNavigationSlice } from '@widgets/card-sections/header-navigation/header-navigation.slice';

import { categoriesData } from './categories';
import styles from './header-navigation.module.scss';

const ANIMATION_CONFIG = {
  logo: {
    initial: { marginLeft: -38 },
    animate: { marginLeft: 0 },
    exit: { marginLeft: -38 },
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  header: {
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
} as const;

const NavigationLogo = () => {
  const isVisible = useAppSelector((state) =>
    headerNavigationSlice.selectors.isVisibleHeaderNav(state),
  );
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  return (
    <AnimatePresence>
      {!isBurgerClicked &&
        isVisible && ( // доступен если произошел скролл ниже header navigation, без logoLetters
          <motion.div {...ANIMATION_CONFIG.logo}>
            <Logo logoType="fixedHeader" isHidden={true} targetToHidden="logoLetters" />
          </motion.div>
        )}
    </AnimatePresence>
  );
};

interface NavigationItemProps {
  name: string;
  img?: string;
  path: string;
}
const NavigationItem = ({ name, img, path }: NavigationItemProps) => {
  const router = useRouter();
  const onClickHeaderNavItem = () => {
    router.push(`/#${path}`);
  };
  return (
    <li className={styles.navItem} onClick={onClickHeaderNavItem}>
      {img && (
        <ConvertStrSvgToComponent
          alt={`Иконка категории ${name}`}
          width={24}
          height={24}
          className={styles.navImg}
          strSvg={img as string}
          draggable={false}
        />
      )}
      <p className={cn('bigtext', styles.navText)}>{name}</p>
    </li>
  );
};

const NavigationList = ({ categories }: { categories: Categories }) => {
  const draggableElementRef = React.useRef<HTMLUListElement>(null);
  const categoriesList = categories.map((item) => item.category);
  const currentCategories = categoriesData.filter((item) => categoriesList.includes(item.path));
  console.log('currentCategories', currentCategories);
  return (
    <motion.ul
      layoutScroll
      ref={draggableElementRef}
      animate={ANIMATION_CONFIG.header}
      className={styles.navList}>
      <NavigationLogo />
      {currentCategories.map((category) => (
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

const HeaderNavigation = ({ data }) => {
  const isVisible = useAppSelector((state) =>
    headerNavigationSlice.selectors.isVisibleHeaderNav(state),
  );
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));

  console.log('isVisible', isVisible);
  console.log('categories', data);
  return (
    <section className={styles.headerNavigation}>
      <div className={styles.headerNavigationWrapper}>
        <motion.div
          layoutRoot
          className={cn(styles.fixedHeaderWrapper, {
            [`fixed-header & ${styles.fixedHeaderWrapper}`]: isVisible && !isBurgerClicked,
          })}>
          <motion.div className="headerNavigation__container">
            <NavigationList categories={data} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeaderNavigation;
