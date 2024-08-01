import cl from "./burger.module.scss";
import { useAppSelector } from "utils/hooks/redux";
import useAccount from "utils/hooks/useAccount";

const Burger = () => {
  const visible = useAppSelector((store) => store.reducer.isVisible.isVisible);

  const { isBurgerClick, onClickBurger } = useAccount();

  const handleOpen = () => {
    onClickBurger();
  };

  return (
    <div
      className={`${cl.burger} 
      ${isBurgerClick ? cl.burger_active : ""} 

      `}
      // ${visible ? "" : cl.hidden}
      aria-label={
        isBurgerClick ? "Закрыть главное меню" : "Открыть главное меню"
      }
      onClick={handleOpen}
    >
      <span className={cl.line} />
    </div>
  );
};

export default Burger;
