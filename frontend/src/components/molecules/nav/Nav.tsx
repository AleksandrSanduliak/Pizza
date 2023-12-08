import React from "react";
import cl from "./Nav.module.scss";
import { categories } from "utils/data/categories";
import { HashLink } from "react-router-hash-link";
import { useAppSelector } from "utils/hooks/redux";
const Nav = () => {
  const visible = useAppSelector((store) => store.reducer.isVisible.isVisible);
  console.log(visible, "visible");
  console.log("nav render");
  return (
    <nav className={cl.categories}>
      <ul
        className={`${cl.categories__list} ${!visible ? "" : "hidden-block"}`}
      >
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
