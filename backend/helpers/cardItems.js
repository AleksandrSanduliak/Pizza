const goods = [
  {
    title: "Пиццы",
    name: "pizza",
    anchor: "pizza",
    items: [
      {
        id: 0,
        productId: 100,
        title: "Пепперони Фреш с перцем",
        desc: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.webp",
        types: [0, 1],
        sizes: [26, 30, 40],
        price: [540, 670, 880],
        weightTypes: {
          0: {
            26: 400,
            30: 575,
            40: 680,
          },
          1: {
            26: 350,
            30: 500,
            40: 640,
          },
        },
        oldprice: 699,
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
      },
      {
        id: 1,
        productId: 101,
        title: "Сырная",
        desc: "Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо",
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.webp",
        types: [0],
        sizes: [40],
        price: [880],
        weightTypes: {
          0: {
            40: 680,
          },
        },
        oldprice: 699,
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
      },
      {
        id: 2,
        productId: 102,
        title: "Цыпленок барбекю",
        desc: "Цыпленок, бекон, соус барбекю, красный лук, моцарелла, фирменный томатный соус",
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D6108E3A1C9952CD3A7F39A4D02.webp",
        types: [0],
        sizes: [26, 40],
        price: [440, 680],
        oldprice: 550,
        weightTypes: {
          0: {
            26: 410,
            40: 720,
          },
        },
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
      },
      {
        id: 3,
        productId: 103,
        title: "Кисло-сладкий цыпленок",
        desc: "Цыпленок, моцарелла, фирменный соус альфредо",
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D6150D498419E133DF19945A00D.avif",
        types: [0],
        sizes: [26, 30, 35, 40],
        price: [545, 670, 750, 890],
        oldprice: 750,
        weightTypes: {
          0: {
            26: 407,
            30: 551,
            35: 651,
            40: 749,
          },
        },
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
      },
      {
        id: 4,
        productId: 104,
        title: "Чизбургер-пицца",
        desc: "Цыпленок, шампиньоны, ароматный грибной соус, лук, сухой чеснок, моцарелла, смесь сыров чеддер и пармезан, фирменный соус альфредо",
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D6149EB101D8727573088FA2EFF.webp",
        types: [1],
        sizes: [26, 30, 35, 40],
        price: [545, 670, 750, 890],
        oldprice: 750,
        weightTypes: {
          1: {
            26: 407,
            30: 551,
            35: 651,
            40: 749,
          },
        },
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
      },
      {
        id: 5,
        productId: 105,
        imageUrl:
          "https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.webp",
        title: "Крэйзи пепперони",
        types: [1],
        sizes: [26, 30, 40],
        price: [645, 720, 890],
        oldprice: 599,
        labeltype: 0,
        weightTypes: {
          1: {
            26: 407,
            30: 551,
            40: 749,
          },
        },
        nutrition_facts: {
          fats: "13.1",
          proteins: "13.1",
          carbs: "29",
          calories: "287.5",
        },
        desc: "Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус",
      },
    ],
  },
  {
    title: "Суши",
    name: "sushi",
    anchor: "sushi",
    items: [
      {
        id: 0,
        productId: 200,
        title: "Бонито",
        desc: "Копченый лосось, творожный сыр и стружка тунца",
        imageUrl:
          "https://cdpiz1.pizzasoft.ru/rs/600x600/pizzafab/items/8/bonito-main_image-8807-63302.jpg",
        price: [369],
        weightTypes: 180,
        nutrition_facts: {
          fats: "6.4",
          proteins: "8.8",
          carbs: "42.2",
          calories: "263",
        },
      },
    ],
  },
];

module.exports = { goods };
