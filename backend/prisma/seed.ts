import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/generated/prisma/client';
const prisma = new PrismaClient({
  adapter: new PrismaPg({
    connectionString: process.env.DATABASE_URL,
  }),
});

enum Categories {
  Pizza = 'pizza',
  Sushi = 'sushi',
}

const categoriesInfo = {
  pizza: {
    category: Categories.Pizza,
    categoryTitle: 'Пицца',
    categoryId: 1,
  },
  sushi: {
    category: Categories.Sushi,
    categoryTitle: 'Суши',
    categoryId: 2,
  },
};

const globalProducts = [
  {
    ...categoriesInfo[Categories.Pizza],
    items: {
      create: [
        {
          title: 'Пепперони Фреш с перцем',
          desc: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
          productId: 10,
          caption: 'pizza-pepperoni',
          imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D612FC7B7FCA5BE822752BEE1E5.webp',
          variants: {
            create: [
              {
                productId: 11,
                title: 'Пепперони Фреш с перцем маленькая',
                desc: 'Пикантная пепперони, увеличенная порция моцареллы, томаты, фирменный томатный соус',
                size: '26 см',
                sizeName: 'Маленькая',
                nutritionFacts: {
                  create: {
                    fats: '13.1',
                    proteins: '13.1',
                    carbs: '29',
                    calories: '287.5',
                    weight: 400,
                  },
                },
              },
            ],
          },
        },
        {
          title: 'Сырная',
          desc: 'Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо',
          productId: 12,
          caption: 'cheese',
          imageUrl:
            'https://media.dodostatic.net/image/r:292x292/11EE7D610D2925109AB2E1C92CC5383C.webp',
          variants: {
            create: [
              {
                productId: 13,
                title: 'Сырная маленькая',
                desc: 'Сыр блю чиз, сыры чеддер и пармезан, моцарелла, фирменный соус альфредо',
                size: '26 см',
                sizeName: 'Маленькая',
                nutritionFacts: {
                  create: {
                    fats: '13.1',
                    proteins: '13.1',
                    carbs: '29',
                    calories: '287.5',
                    weight: 400,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
  {
    ...categoriesInfo[Categories.Sushi],
    items: {
      create: [
        {
          title: 'Сет Темпура',
          desc: 'Сет роллов с пикантными соусами',
          caption: 'tempura-set',
          productId: 21,
          imageUrl:
            'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/11/set-pikantnyy-main_image-11661-80108.jpg',
          variants: {
            create: [
              {
                title: 'Сет Темпура',
                desc: 'Сет из трех роллов с пикантными соусами',
                productId: 22,
                size: '3 шт',
                nutritionFacts: {
                  create: {
                    fats: '13.1',
                    proteins: '13.1',
                    carbs: '29',
                    calories: '287.5',
                    weight: 400,
                  },
                },
              },
            ],
          },
        },
        {
          title: 'Калифорния Том Ям',
          desc: 'Любимый вкус в новом исполнении',
          caption: 'california-tomyum',
          productId: 23,
          imageUrl:
            'https://cdpiz1.pizzasoft.ru/cr/1000x1000/pizzafab/items/11/set-hit-main_image-11428-95092.jpg',
          variants: {
            create: [
              {
                productId: 24,
                title: 'Калифорния Том Ям',
                desc: 'Любимый вкус в новом исполнении',
                size: '3 шт',
                nutritionFacts: {
                  create: {
                    fats: '13.1',
                    proteins: '13.1',
                    carbs: '29',
                    calories: '287.5',
                    weight: 400,
                  },
                },
              },
            ],
          },
        },
      ],
    },
  },
];

const cityList = [
  {
    city: 'moscow',
    name: 'Москва',
    url: 'moscow',
    isActive: true,
    restaurants: {
      create: [
        { deliverytime: '10min', address: 'Боршодская 52' },
        { deliverytime: '20min', address: 'Социалистическая 11' },
      ],
    },
  },
  {
    city: 'stpetersburg',
    name: 'Санкт-Петербург',
    url: 'stpetersburg',
    isActive: true,
    restaurants: {
      create: [
        { deliverytime: '10min', address: 'Ленина 120' },
        { deliverytime: '20min', address: 'Советсктй 10а' },
      ],
    },
  },
];

// async function main() {
//   console.log('Seeding...');
//   await prisma.city.deleteMany();
//   await prisma.restaurants.deleteMany();
//   await prisma.globalProductItem.deleteMany();
//   await prisma.globalProduct.deleteMany();
//   await prisma.localProductItem.deleteMany();
//   await prisma.localProduct.deleteMany();
//   await prisma.nutritionFacts.deleteMany();

//   for (const globalProduct of globalProducts) {
//     await prisma.globalProduct.create({
//       data: globalProduct,
//     });
//   }

//   // const globalProductList = await prisma.globalProduct.findMany({
//   //   include: {
//   //     items: true,
//   //   },
//   // });
//   // console.log('dishesa', JSON.stringify(globalProductList));
//   // const newDishes = globalProductList.map((globalProduct, index) => {
//   //   return {
//   //     // category: globalProduct.category,
//   //     // categoryId: globalProduct.categoryId,
//   //     globalProductId: globalProduct.id,
//   //     localProductItems: {
//   //       create: globalProduct.items.map((globalProductItem, index) => ({
//   //         globalProductItemId: globalProductItem.id,
//   //         price: 599,
//   //       })),
//   //     },
//   //   };
//   // });
//   // console.log('newDishes', JSON.stringify(newDishes));
//   // console.log('newDishes', newDishes);
//   // for (const city of cityList) {
//   //   await prisma.city.create({
//   //     data: {
//   //       ...city,
//   //       menu: { create: newDishes },
//   //     },
//   //   });
//   // }

//   // const citylist = await prisma.city.findMany({
//   //   include: {
//   //     menu: {
//   //       select: {
//   //         localProductItems: {
//   //           include: {
//   //             globalProductItem: {
//   //               select: {
//   //                 id: true,
//   //                 title: true,
//   //                 desc: true,
//   //                 productId: true,
//   //                 caption: true,
//   //                 globalProductId: true,
//   //                 variants: true,
//   //               },
//   //             },
//   //             localProduct: {
//   //               select: {
//   //                 cityId: true,
//   //                 globalProductId: true,
//   //               },
//   //               // include: {
//   //               //   globalProduct: true,
//   //               // },
//   //             },
//   //           },
//   //         },
//   //       },
//   //     },
//   //   },
//   // });
//   // console.log('citylist', JSON.stringify(citylist));
//   // console.log('Seeding complete!');
// }

// main()
//   .catch((e) => {
//     console.error(e);
//     process.exit(1);
//   })
//   .finally(async () => {
//     await prisma.$disconnect();
//   });
