import React from 'react';

import cn from 'classnames';

import fire from 'assets/icons/fire.svg';
import BaseButton from 'atoms/Buttons/BaseButton';
import Label from 'atoms/Label/Label';
import { useCardContext } from 'molecules/CardItem/CompoundItemContext';
import Tabs from 'molecules/tabs/Tabs';
import { pizzaTypes } from 'utils/data/pizzaData';
import { TFoodItem } from 'utils/types/types';

import cl from './CardItemModal.module.scss';
import NutritionDropdown from '../../../../../dropdown/NutritionDropdown/NutritionDropdown';
import FullPageModal from '../../../../../modals/ReusableAbstractModals/Modal/Modal';

const CardModalContentText = ({
  title,
  nutrition_facts,
  actualWeight,
  desc,
  actualPizzaType,
  actualSize,
}) => {
  return (
    <div className={cl.text}>
      <div className={cl.header}>
        <div className={cl.headerLeft}>
          <img
            className={cl.fireIcon}
            alt="Иконка Огня"
            src={fire}
            loading="lazy"
            width="24px"
            height="24px"
          />
          <h4 className="h4">{title}</h4>
        </div>
        {nutrition_facts && <NutritionDropdown info={nutrition_facts} weight={actualWeight} />}
      </div>
      <div className={cl.summaryInfo}>
        <p className={`mini ${cl.summaryTitle}`}>
          {actualPizzaType} тесто, {actualSize} см, {actualWeight} г
        </p>
        <p className="normal">{desc}</p>
      </div>
    </div>
  );
};
const CardModalContentTabs = ({
  types,
  sizes,
  parsePizzaTypes,
  pizzaType,
  parseSizeTypes,
  setPizzaType,
  setSizeId,
  sizeId,
}) => {
  return (
    <>
      <div className={cl.pizzaTab}>
        {types && (
          <Tabs tabsArray={parsePizzaTypes} activeTab={pizzaType} setActiveTab={setPizzaType} />
        )}
      </div>
      <div className={cl.sizeTab}>
        {sizes?.length && (
          <Tabs tabsArray={parseSizeTypes} activeTab={sizeId} setActiveTab={setSizeId} />
        )}
      </div>
    </>
  );
};

const CardModalContentFooter = ({ price, sizeId, saveToCard }) => {
  return (
    <div className={cl.footer}>
      <div className={cl.footerButtons}>
        <p className="h4 priceActual">Итого: {price[sizeId] ?? price} ₽</p>
        <BaseButton buttonMode="primary" type="button" onClick={saveToCard}>
          Добавить
        </BaseButton>
      </div>
    </div>
  );
};

const CardItemModal = ({
  foodItem,
  isShowModal,
  onClose,
}: {
  foodItem: TFoodItem;
  isShowModal: boolean;
  onClose: () => void;
}) => {
  console.log('foodItem', foodItem);
  // const [saveCard, { data, isLoading, isError, error, isSuccess }] = useSaveCardMutation();
  const { addToCart } = useCardContext();
  const [pizzaType, setPizzaType] = React.useState<number>(0);
  const [sizeId, setSizeId] = React.useState(foodItem?.sizes?.length > 1 ? 1 : 0);

  const parsePizzaTypes = foodItem?.types && foodItem?.types?.map((el) => pizzaTypes[el]);
  const parseSizeTypes = foodItem?.types && foodItem?.sizes?.map((el) => `${el} см`);

  const actualSize = [foodItem?.sizes?.[sizeId]];
  const actualWeight =
    typeof foodItem?.weightTypes === 'object'
      ? foodItem?.weightTypes?.[pizzaType]?.[actualSize]
      : foodItem?.weightTypes;
  const actualPizzaType = pizzaTypes?.[pizzaType];

  const saveToCard = () => {
    addToCart(foodItem);
    // saveCard({
    //   id: fooditem.id,
    //   desc: fooditem.desc,
    //   title: fooditem.title,
    //   sizes: fooditem?.sizes && fooditem?.sizes[sizeId],
    //   types: pizzaTypes?.[pizzaType] ?? null,
    //   price: fooditem?.price[1] ?? fooditem?.price[0],
    //   imageUrl: fooditem.imageUrl,
    //   nutrition_facts: {
    //     ...fooditem.nutrition_facts,
    //     weight: fooditem?.weightTypes?.[pizzaType]?.[sizeId],
    //   },
    // });
  };

  return (
    <FullPageModal isOpen={isShowModal} onClose={onClose}>
      <div className={cl.modalWrapper}>
        <div className={cl.modal}>
          {foodItem.labeltype && <Label labelType={foodItem.labeltype} />}
          <div className={cl.img}>
            <img
              width="400px"
              height="400px"
              src={foodItem.imageUrl}
              alt={`Пицца ${foodItem.title}`}
            />
          </div>
          <div className={cl.content}>
            <CardModalContentText
              title={foodItem.title}
              nutrition_facts={foodItem.nutrition_facts}
              desc={foodItem.desc}
              actualWeight={actualWeight}
              actualPizzaType={actualPizzaType}
              actualSize={actualSize}
            />
            <CardModalContentTabs
              types={foodItem.types}
              sizes={foodItem.sizes}
              parsePizzaTypes={parsePizzaTypes}
              pizzaType={pizzaType}
              parseSizeTypes={parseSizeTypes}
              setPizzaType={setPizzaType}
              setSizeId={setSizeId}
              sizeId={sizeId}
            />
            <CardModalContentFooter
              price={foodItem.price}
              sizeId={sizeId}
              saveToCard={saveToCard}
            />
          </div>
        </div>
      </div>
    </FullPageModal>
  );
};

export default CardItemModal;
