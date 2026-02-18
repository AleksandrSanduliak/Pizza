'use client';
import cn from 'classnames';

import useUserMenu from '@entities/user-menu/useUserMenu';

import cl from './BurgerButton.module.scss';

const BurgerButton = () => {
  const { isBurgerClick, onClickBurger } = useUserMenu();

  const handleOpen = () => {
    onClickBurger();
  };

  return (
    <div
      className={cn(cl.burgerButton, { [cl.burgerActive]: isBurgerClick })}
      aria-label={isBurgerClick ? 'Закрыть главное меню' : 'Открыть главное меню'}
      onClick={handleOpen}>
      <span className={cl.line} />
      <span className={cl.line} />
      <span className={cl.line} />
    </div>
  );
};

export default BurgerButton;
