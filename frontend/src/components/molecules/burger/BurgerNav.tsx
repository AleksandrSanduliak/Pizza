import Contacts from 'molecules/contacts/Contacts';
import { BurgerCategories } from 'utils/data/burgerCategories';
import cl from './burger.module.scss';

const BurgerNav = () => {
  return (
    <>
      <nav className={cl.burger__nav}>
        <ul className={cl.burger__list}>
          {BurgerCategories.map((el) => {
            return <li key={el.name}>{el.name}</li>;
          })}
        </ul>
      </nav>
      <div className={cl.burger__contacts}>
        <Contacts />
      </div>
      <div className={cl.burger__footer}>Время работы: с 11:00 до 23:00</div>
    </>
  );
};

export default BurgerNav;
