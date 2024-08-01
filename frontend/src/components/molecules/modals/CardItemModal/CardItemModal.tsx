import React from "react";
import Modal from "../Modal/Modal";
import cl from "./carditem.module.scss";
import { foodType } from "utils/types/types";
import Label from "atoms/label/Label";
import fire from "assets/icons/fire.svg";
import Tabs from "molecules/tabs/Tabs";
import { Button } from "atoms/button/Button";
import NutritionDropdown from "../../dropdown/NutritionDropdown/NutritionDropdown";
import { useSaveCardMutation } from "store/api/orderApi";
import { pizzaTypes } from "utils/data/pizzaData";

const CardItemModal = ({ food }: foodType) => {
  const checkSizeType = food?.sizes?.length > 1 ? 1 : 0;
  const [pizzaType, setPizzaType] = React.useState<number>(0);
  const [sizeId, setSizeId] = React.useState(checkSizeType);

  const [saveCard, { data, isLoading, isError, error, isSuccess }] =
    useSaveCardMutation();

  const saveToCard = () => {
    saveCard({
      id: food.id,
      desc: food.desc,
      title: food.title,
      sizes: food?.sizes && food?.sizes[sizeId],
      types: pizzaTypes?.[pizzaType] ?? null,
      price: food?.price[1] ?? food?.price[0],
      imageUrl: food.imageUrl,
      nutrition_facts: {
        ...food.nutrition_facts,
        weight: food?.weightTypes?.[pizzaType]?.[sizeId],
      },
    });
  };

  const parsePizzaTypes =
    food?.types && food?.types?.map((el) => pizzaTypes[el]);
  const parseSizeTypes = food?.types && food?.sizes?.map((el) => `${el} см`);

  const actualSize = [food?.sizes?.[sizeId]];
  const actualWeight =
    typeof food?.weightTypes === "object"
      ? food?.weightTypes?.[pizzaType]?.[actualSize]
      : food?.weightTypes;
  const actualPizzaType = pizzaTypes[pizzaType];
  return (
    <Modal>
      <div className={cl.wrapper}>
        <div className={cl.inner}>
          <Label labelType={food.labeltype} />
          <div className={cl.img}>
            <img
              width="400px"
              height="400px"
              src={food.imageUrl}
              alt={`Пицца ${food.title}`}
            />
          </div>
          <div className={cl.content}>
            <div className={cl.text}>
              <div className={cl.header}>
                <div className={cl.headerLeft}>
                  <img
                    className={cl.fireIcon}
                    alt="Иконка Огня"
                    src={fire}
                    width="24px"
                    height="24px"
                  />
                  <h4 className="h4">{food.title}</h4>
                </div>
                {food?.nutrition_facts && (
                  <NutritionDropdown
                    info={food?.nutrition_facts}
                    weight={actualWeight}
                  />
                )}
              </div>
              <div className={cl.summaryInfo}>
                <p className={`mini ${cl.summaryTitle}`}>
                  {actualPizzaType} тесто, {actualSize} см, {actualWeight} г
                </p>
                <p className="normal">{food.desc}</p>
              </div>
            </div>
            <div className={cl.pizzaTab}>
              {food?.types && (
                <Tabs
                  tabsArray={parsePizzaTypes}
                  activeTab={pizzaType}
                  setActiveTab={setPizzaType}
                />
              )}
            </div>
            <div className={cl.sizeTab}>
              {food?.sizes?.length && (
                <Tabs
                  tabsArray={parseSizeTypes}
                  activeTab={sizeId}
                  setActiveTab={setSizeId}
                />
              )}
            </div>
            <div className={cl.footer}>
              <div className={cl.footerButtons}>
                <p className={`h4 price__actual`}>
                  Итого: {food.price[sizeId] ?? food.price} ₽
                </p>
                <Button onClick={saveToCard}>Добавить</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardItemModal;
