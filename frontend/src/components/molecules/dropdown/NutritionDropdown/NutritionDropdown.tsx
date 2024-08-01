import NutritionInfo from "atoms/nutritionInfo/NutritionInfo";
import PortalDropdown from "molecules/dropdown/DropdownPortalWrapper/PortalDropdown";
import React from "react";
import infoSVG from "assets/icons/info.svg";
import cl from "./nutritionDropdown.module.scss";
import { useOutsideClick } from "utils/hooks/useOutsideClick";
import { stopBubling } from "utils/funcs/stopBubling";

interface INutritionDropdown {
  info: any;
  weight?: number;
}

const NutritionDropdown = ({ info, weight }: INutritionDropdown) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const infoRef = useOutsideClick(() => {
    setIsOpen(false);
  });

  const isFocusStyles = {
    transform: "scale(1.1)",
  };

  return (
    <div>
      <div
        ref={infoRef}
        className={cl.wrapper}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <img
          className={`${cl.img} ${isOpen && cl.isActive}`}
          src={infoSVG}
          width="24px"
          height="24px"
          alt="Информация"
        />
        {isOpen && (
          <div onClick={stopBubling} className={cl.dropdown}>
            <div className={cl.content}>
              <svg
                viewBox="0 0 18 12"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                className={cl.triangle}
              >
                <path
                  transform="translate(-2 0)"
                  fillRule="evenodd"
                  d="M 9.52569 1.60834L 3.07216 8.64855C 1.89626 9.93135 2.80626 12 4.54647 12L 17.4535 12C 19.1937 12 20.1037 9.93135 18.9278 8.64855L 12.4743 1.60834C 11.6816 0.743602 10.3184 0.743603 9.52569 1.60834Z"
                ></path>
              </svg>
              <div className={cl.text}>
                <p className={`mini ${cl.title}`}>Пищевая ценность на 100 г </p>
                <p className={`normal ${cl.row}`}>
                  <span>Энерг. ценность</span>{" "}
                  <span>{info?.calories} ккал</span>
                </p>
                <p className={`normal ${cl.row}`}>
                  Белки <span>{info?.proteins} г</span>
                </p>
                <p className={`normal ${cl.row}`}>
                  Жиры <span>{info?.fats} г</span>
                </p>
                <p className={`normal ${cl.row}`}>
                  Углеводы <span>{info?.carbs} г</span>
                </p>
                <div className={cl.footer}>
                  {weight && (
                    <p className={`normal ${cl.footerRow}`}>
                      Вес <span>{weight} г</span>
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionDropdown;
