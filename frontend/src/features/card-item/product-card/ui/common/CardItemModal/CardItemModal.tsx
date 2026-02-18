import React from 'react';

import { useCardContext } from '@entities/card-item/model/context';
import NutritionDropdown from '@features/dropdown/NutritionDropdown/NutritionDropdown';
import { pizzaTypes } from '@shared/data/pizzaData';
import { Tproduct } from '@shared/types/types';
import { Button } from '@shared/ui/button/button';
import Label from '@shared/ui/label/Label';
import Tabs from '@shared/ui/tabs/Tabs';

import cl from './CardItemModal.module.scss';

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
        <Button type="button" onClick={saveToCard}>
          Добавить
        </Button>
      </div>
    </div>
  );
};

const CardItemModal = ({
  product,
  isShowModal,
  onClose,
}: {
  product: Tproduct;
  isShowModal: boolean;
  onClose: () => void;
}) => {
  // console.log('product', product);
  // const [saveCard, { data, isLoading, isError, error, isSuccess }] = useSaveCardMutation();
  const { addToCart } = useCardContext();
  const [pizzaType, setPizzaType] = React.useState<number>(0);
  const [sizeId, setSizeId] = React.useState(product?.sizes?.length > 1 ? 1 : 0);

  const parsePizzaTypes = product?.types && product?.types?.map((el) => pizzaTypes[el]);
  const parseSizeTypes = product?.types && product?.sizes?.map((el) => `${el} см`);

  const actualSize = [product?.sizes?.[sizeId]];
  const actualWeight =
    typeof product?.weightTypes === 'object'
      ? product?.weightTypes?.[pizzaType]?.[actualSize]
      : product?.weightTypes;
  const actualPizzaType = pizzaTypes?.[pizzaType];

  const saveToCard = () => {
    addToCart(product);
    // saveCard({
    //   id: product.id,
    //   desc: product.desc,
    //   title: product.title,
    //   sizes: product?.sizes && product?.sizes[sizeId],
    //   types: pizzaTypes?.[pizzaType] ?? null,
    //   price: product?.price[1] ?? product?.price[0],
    //   imageUrl: product.imageUrl,
    //   nutrition_facts: {
    //     ...product.nutrition_facts,
    //     weight: product?.weightTypes?.[pizzaType]?.[sizeId],
    //   },
    // });
  };

  return (
    <FullPageModal isOpen={isShowModal} onClose={onClose}>
      <div className={cl.modalWrapper}>
        <div className={cl.modal}>
          {product.labeltype && <Label labelType={product.labeltype} />}
          <div className={cl.img}>
            <img
              width="400px"
              height="400px"
              src={product.imageUrl}
              alt={`Пицца ${product.title}`}
            />
          </div>
          <div className={cl.content}>
            <CardModalContentText
              title={product.title}
              nutrition_facts={product.nutrition_facts}
              desc={product.desc}
              actualWeight={actualWeight}
              actualPizzaType={actualPizzaType}
              actualSize={actualSize}
            />
            <CardModalContentTabs
              types={product.types}
              sizes={product.sizes}
              parsePizzaTypes={parsePizzaTypes}
              pizzaType={pizzaType}
              parseSizeTypes={parseSizeTypes}
              setPizzaType={setPizzaType}
              setSizeId={setSizeId}
              sizeId={sizeId}
            />
            <CardModalContentFooter price={product.price} sizeId={sizeId} saveToCard={saveToCard} />
          </div>
        </div>
      </div>
    </FullPageModal>
  );
};

export default CardItemModal;
