'use client';
import Contacts from 'molecules/contacts/Contacts';
import { BurgerCategories } from 'utils/data/burgerCategories';

import cl from './burger.module.scss';

const BurgerNavigation = () => {
  return (
    <div className={cl.burgerNavigation}>
      <div className="burgerNav__container">
        <ul className={cl.burgerNavigationList}>
          {BurgerCategories.map((el) => {
            return <li key={el.name}>{el.name}</li>;
          })}
        </ul>
      </div>
    </div>
  );
};

const BurgerContacts = () => {
  return (
    <div className={cl.burgerContacts}>
      <div className="burgerContacts__container">
        <Contacts />
      </div>
    </div>
  );
};

const BurgerNav = () => {
  return (
    <nav className={cl.burgerNavigationWrapper}>
      <BurgerNavigation />
      <BurgerContacts />
      <div className={cl.burgerFooter}>Время работы: с 11:00 до 23:00</div>
    </nav>
  );
};

export default BurgerNav;
