import React from "react";
import cl from "./cartCategory.module.scss";
import stock from "../../../assets/icons/categories/stock.svg";
import { HashLink } from "react-router-hash-link";
import { categories } from "../../../utils/data/categories";
const Categories = () => {
  return (
    <section>
      <ul className={cl.categoriesList}>
        {categories.map((category) => {
          return (
            <li key={category.name}>
              <HashLink
                className={cl.cartCategory}
                smooth
                // activeStyle={{ color: "red" }}
                to={`/#${category.path}`}
              >
                <img src={stock} alt="Иконка категории" />
                <p>{category.name}</p>
              </HashLink>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Categories;
