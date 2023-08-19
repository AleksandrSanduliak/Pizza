import React from "react";
import cl from "./Nav.module.scss";
import { categories } from "../../../utils/data/categories";
import { HashLink } from "react-router-hash-link";
const Nav = () => {
  return (
    <nav className={cl.categories}>
      <ul className={cl.categories__list}>
        {categories.map((el) => (
          <li className={cl.categories__item} key={el.name}>
            <HashLink
              className={cl.cartCategory}
              smooth
              // activeStyle={{ color: "red" }}
              to={`/#${el.path}`}
            >
              {el.name}
            </HashLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Nav;
