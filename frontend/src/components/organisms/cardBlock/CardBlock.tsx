import React from "react";
import cl from "./cardBlock.module.scss";
import pizzas from "utils/data/pizzas.json";
import CardItem from "molecules/cardItem/CardItem";
import { Button } from "atoms/button/Button";
import { useGetGoodsQuery } from "store/api/goodsApi";
// const obj = [
//   {
//     id: 0,
//     title: "Пепперони Фреш с перцем",
//     desc: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.webp",
//     types: [0, 1],
//     sizes: [26, 30, 40],
//     price: [540, 670, 880],
//     weightTypes: {
//       0: {
//         26: 400,
//         30: 575,
//         40: 680,
//       },
//       1: {
//         26: 350,
//         30: 500,
//         40: 640,
//       },
//     },
//     oldprice: 699,
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//   },
//   {
//     id: 1,
//     title: "Сырная",
//     desc: "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.webp",
//     types: [0],
//     sizes: [40],
//     price: [880],
//     weightTypes: {
//       0: {
//         40: 680,
//       },
//     },
//     oldprice: 699,
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//   },
//   {
//     id: 2,
//     title: "Цыпленок барбекю",
//     desc: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.webp",
//     types: [0],
//     sizes: [26, 40],
//     price: [440, 680],
//     oldprice: 550,
//     weightTypes: {
//       0: {
//         26: 410,
//         40: 720,
//       },
//     },
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//   },
//   {
//     id: 3,
//     title: "Кисло-сладкий цыпленок",
//     desc: "Цыпленок, моцарелла, фирменный соус альфредо",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D6110059795842D40396BCF1E73.webp",
//     types: [1],
//     sizes: [26, 30, 35, 40],
//     price: [545, 670, 750, 890],
//     oldprice: 750,
//     weightTypes: {
//       1: {
//         26: 407,
//         30: 551,
//         35: 651,
//         40: 749,
//       },
//     },
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//   },
//   {
//     id: 4,
//     title: "Чизбургер-пицца",
//     desc: "Цыпленок, шампиньоны, ароматный грибной соус, лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо",
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D6149EB101D8727573088FA2EFF.webp",
//     types: [1],
//     sizes: [26, 30, 35, 40],
//     price: [545, 670, 750, 890],
//     oldprice: 750,
//     weightTypes: {
//       1: {
//         26: 407,
//         30: 551,
//         35: 651,
//         40: 749,
//       },
//     },
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//   },
//   {
//     id: 4,
//     imageUrl:
//       "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.webp",
//     title: "Крэйзи пепперони",
//     types: [0, 1],
//     sizes: [26, 30, 40],
//     price: [645, 720, 890],
//     oldprice: 599,
//     labeltype: 0,
//     weightTypes: {
//       1: {
//         26: 407,
//         30: 551,
//         40: 749,
//       },
//     },
//     nutrition_facts: {
//       fats: "13.1",
//       proteins: "13.1",
//       carbs: "29",
//       calories: "287.5",
//     },
//     desc: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
//   },
// ];
const CardBlock = () => {
  const { data, isFetching } = useGetGoodsQuery();
  // console.log(data);
  // React.useEffect(() => {
  //   getGoods();
  // }, [getGoods]);
  return (
    <section>
      <div className="cardBlock__container">
        <div>
          {/* {Object.values(pizzas).map((food) => {
        return (
          <div className={cl.cardBlock__wrapper} id={`${food.anchor}`}>
            <p className={cl.cardBlock__blockTitle}>
              <span className="h1">{food.title}</span>{" "}
              <Button btnType="filter">Фильтры</Button>
            </p>
            <div className={cl.cardBlock__block}>
              {food.data.map((foodItem) => {
                return <CardItem food={foodItem} key={foodItem.title} />;
              })}
            </div>
          </div>
        );
      })} */}
          <div>
            <div className={cl.cards}>
              {data?.length &&
                data.map((el) => {
                  return (
                    <div key={el.anchor} className={cl.card}>
                      <h1 id={`${el.anchor}`} className={`h1 ${cl.title}`}>
                        {el.title}
                      </h1>
                      {/* <div className={cl.items}> */}
                      {el.items.map((food) => {
                        // console.log("food", food);
                        return <CardItem key={food.name} food={food} />;
                      })}
                      {/* </div> */}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CardBlock;
