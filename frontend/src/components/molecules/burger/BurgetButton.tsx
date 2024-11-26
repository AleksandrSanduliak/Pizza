import cn from 'classnames';
import useAccount from 'utils/hooks/useAccount';
import cl from './burger.module.scss';

const BurgerButton = () => {
  const { isBurgerClick, onClickBurger } = useAccount();

  const handleOpen = () => {
    onClickBurger();
  };

  return (
    <div
      className={cn(cl.burgerButton, { isBurgerClick: cl.burger_active })}
      aria-label={
        isBurgerClick ? 'Закрыть главное меню' : 'Открыть главное меню'
      }
      onClick={handleOpen}>
      <span className={cl.line} />
    </div>
  );
};

export default BurgerButton;
