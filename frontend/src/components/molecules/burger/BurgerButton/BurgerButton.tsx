'use client';
import cn from 'classnames';

import useAccount from 'utils/hooks/ui/useAccount';

import cl from './BurgerButton.module.scss';

const BurgerButton = () => {
  const { isBurgerClick, onClickBurger } = useAccount();

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
