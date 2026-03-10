'use client';
import cn from 'classnames';

import { userMenuSlice, toggleBurgerMenu } from '@entities/user-menu/user-menu.slice';
import { useAppDispatch, useAppSelector } from '@shared/store/hooks';

import cl from './burger-button.module.scss';

const BurgerButton = () => {
  const dispatch = useAppDispatch();
  const isBurgerClicked = useAppSelector((state) => userMenuSlice.selectors.isBurgerClicked(state));
  const handleOpen = () => {
    console.log('onclick');
    dispatch(toggleBurgerMenu());
  };

  return (
    <div
      className={cn(cl.burgerButton, { [cl.burgerActive]: isBurgerClicked })}
      aria-label={isBurgerClicked ? 'Закрыть главное меню' : 'Открыть главное меню'}
      onClick={handleOpen}>
      <span className={cl.line} />
      <span className={cl.line} />
      <span className={cl.line} />
    </div>
  );
};

export default BurgerButton;
