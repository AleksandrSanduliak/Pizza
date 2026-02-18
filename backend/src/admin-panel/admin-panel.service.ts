import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { PrismaService } from 'src/prisma/prisma.service';
import { GetGlobalProductDTO } from './dto/get-global-product.dto';

@Injectable()
export class AdminPanelService {
  constructor(
    private prisma: PrismaService,
    private prismaAdapter: PrismaAdapter,
  ) { }

  create() {
    return 'This action adds a new adminPanel';
  }

  async getGlobalProducs() {
    const getGlobalProducs = await this.prisma.globalProduct.findMany({
      include: {
        variants: true,
      },
    });
    // console.log('getGlobalProducs', getGlobalProducs);
    return getGlobalProducs;
  }

  async createGlobalProduct({ data }) {
    const transformedData = this.prismaAdapter.toCreateNested(data);
    console.log('transformedData', transformedData);
    const getGlobalProducs = await this.prisma.globalProduct.create({
      data: transformedData,
    });
    return getGlobalProducs;
  }

  async deleteGlobalProduct({ data }: { data: { category: string, id: number } }) {
    if (!data.category || !data.id) throw new BadRequestException('Отсутствует категория или ID в запросе',)
    const deleteProduct = await this.prisma.productCategory.update({
      where: {
        category: data.category
      },
      data: {
        products: {
          delete: {
            id: data.id
          },
        },
      },
    });

    console.log('deleteProduct', deleteProduct)
    if (deleteProduct) return { success: true, message: `Глобальный продукт с ID:${data.id} удален успешно` };
    return {
      success: false,
      message: `Глобальный продукт с ID:${data.id} не удален`
    }
  }

  async updateGlobalProduct({ data }) {
    const transformedData = this.prismaAdapter.toUpdateNested(data);
    console.log('transformedData', JSON.stringify(transformedData))
    const updateGlobalProduct = await this.prisma.globalProduct.update({
      where: {
        category: data.category,
        id: data.id
      },
      data: transformedData
    })
    return updateGlobalProduct;
  }

  async getGlobalCategories() {
    const globalCategories = await this.prisma.productCategory.findMany();
    return {
      globalCategories: globalCategories,
      totalCount: globalCategories.length ?? 0
    };
  }

  async createGlobalCategory({ data }) {
    // console.log('data', data);
    const { category, categoryTitle } = data;
    const createCategory = await this.prisma.productCategory.create({
      data: {
        category,
        categoryTitle,
      },
    });
    // console.log('createCategory', createCategory);

    return createCategory;
  }

  async createLocalCategory({ data }) {
    // console.log('data', data);
    if (!data.city || !data.category) {
      throw new BadRequestException(
        'Отсутствует город или категория в запросе',
        {
          cause: new Error(),
          description: 'Ошибка при создании категории города',
        },
      );
    }
    const findCategoryInCity = await this.prisma.localCategory.findFirst({
      where: {
        city: {
          city: data.city,
        },
        category: data.category,
      },
      select: {
        id: true,
      },
    });

    console.log('findCategoryInCity', findCategoryInCity);
    if (findCategoryInCity) {
      throw new ConflictException(
        `Категория "${data.category}" уже существует для города "${data.city}"`,
        {
          cause: new Error(),
          description: 'Ошибка при создании категории города',
        },
      );
    }

    const createCategory = await this.prisma.city.update({
      where: {
        city: data.city,
      },
      data: {
        categories: {
          create: {
            category: data.category,
          },
        },
      },
    });
    // console.log('createCategory', createCategory);

    return createCategory;
  }

  async getCategory(category: string) {
    // const getCategory = await this.prisma.productCategory.findMany();
    const findUnique = await this.prisma.productCategory.findUnique({
      where: {
        category: category,
      },
      include: {
        products: {
          // include: {
          //   variants: {
          //     include: {
          //       nutritionFacts: true,
          //     },
          //   },
          // },
        },
      },
    });
    // console.log('findUnique', findUnique);
    // console.log('getGlobalCategories', getCategory);
    return findUnique;
  }

  async getGlobalProduct({ category, id }: GetGlobalProductDTO) {
    const globalProduct = await this.prisma.globalProduct.findFirst({
      where: {
        category,
        id
      },
      include: {
        variants: {
          include: {
            nutritionFacts: true,
          },
        },
      },
    },);
    // const globalProduct = await this.prisma.productCategory.findFirst({
    //   where: {
    //     category,
    //     products: {
    //       some: {
    //         id
    //       }
    //     }
    //   },
    //   include: {
    //     products: {
    //       include: {
    //         variants: {
    //           include: {
    //             nutritionFacts: true,
    //           },
    //         },
    //       },
    //     }
    //   }
    // });
    console.log('globalProduct 12', globalProduct);
    return globalProduct;
  }

  async createCity(data) {
    // console.log('data', data.data);
    const validateData = { ...data.data, city: data.data.city.toLowerCase() };
    const createCity = await this.prisma.city.create({ data: validateData });
    return createCity;
  }

  async getCitiesList() {
    const getCitiesList = await this.prisma.city.findMany();
    // console.log('getCitiesList', getCitiesList);
    return getCitiesList;
  }

  async getCity(city: string) {
    // console.log('city', city);
    const getCity = await this.prisma.city.findUnique({
      where: {
        city: city,
      },
      include: {
        restaurants: true,
        categories: {
          include: {
            products: {
              include: {
                globalProduct: true,
                localProductItems: {
                  include: {
                    globalProductVariant: true
                  }
                },
              },
            },
            productCategory: true,
          },
        },
      },
    });

    const mapData = {
      ...getCity,
      categories: getCity?.categories?.length > 0 ? getCity.categories.map((category) => {
        // console.log('category', category)
        return {
          id: category.id,

          cityId: category.cityId,
          category: category.productCategory.category,
          categoryTitle: category.productCategory.categoryTitle,
          products: category.products.map((product) => {
            // console.log('product', product)
            return {
              id: product.id,
              order: Number(product.order),
              category: product.globalProduct.category,
              title: product.globalProduct.title,
              desc: product.globalProduct.desc,
              imageUrl: product.globalProduct.imageUrl,
              caption: product.globalProduct.caption,
              variants: product.localProductItems.map((localProduct) => {
                return {
                  ...localProduct,
                  ...localProduct.globalProductVariant
                }
              })
            }
          })
        }
      }) : []
    }
    console.log('getCity', getCity);
    console.log('mapData', mapData);
    return mapData;
  }

  async createLocalProduct({ data }) {
    console.log('data', data);
    const processVariants = data.localProductItems.map((item) => item.price);
    console.log('processVariants', processVariants)
    const findMinPriceValue = Math.min(...processVariants);
    console.log('findMinPriceValue', findMinPriceValue)
    const updatedData = structuredClone(data);
    updatedData.price = findMinPriceValue.toString()
    // updatedData.localCategoryId = 1
    const transformedData = this.prismaAdapter.toCreateNested(updatedData);
    console.log('transformedData', transformedData)
    const createData = {
      price: findMinPriceValue.toString(),
      order: data.order || "0",

      // Связываем с GlobalProduct
      globalProduct: {
        connect: { id: parseInt(data.globalProductId, 10) }
      },

      // Связываем с LocalCategory
      localCategory: {
        connect: { id: parseInt(data.localCategoryId, 10) }
      },

      // Создаем LocalProductItems с связями
      localProductItems: {
        create: data.localProductItems.map(item => ({
          price: item.price,
          globalProductVariant: {
            connect: { id: item.globalProductVariantId }  // ← ПРАВИЛЬНЫЙ СИНТАКСИС
          }
        }))
      }
    };
    const createLocalProductRequest = await this.prisma.localProduct.create({
      data: createData,
    });
    // const createLocalProductRequest = await this.prisma.localCategory.update({
    //   where: {
    //     category: 'pizza',
    //     id: 1,

    //     cityId: 3
    //   },
    //   data: {
    //     ...transformedData,
    //     //   category: 'pizza',
    //     //   // productCategory: 'pizza',
    //     //   // city: 'cherepovets',
    //   }
    // });
  }

  async deleteLocalProduct({ data }: { data: { productId: number, category: string, cityId: number } }) {
    console.log('data id', data.productId)
    if (!data.category || !data.cityId || !data.productId) throw new BadRequestException('Отсутствует категория или ID в запросе',)

    const deleteProduct = await this.prisma.localProduct.delete({
      where: {
        id: data.productId,
        localCategory: {
          cityId: data.cityId,
          category: data.category
        }
      },
      //   // data: {
      //   //   products: {
      //   //     delete: {
      //   //       id: data.id
      //   //     },
      //   //   },
      //   // },
    });
    return {

      deleteProduct
    }
    // const deleteProduct = await this.prisma.localCategory.update({
    //   where: {
    //     cityId_category: {
    //       category: data.category,
    //       cityId: data.cityId,
    //     }
    //   },
    //   data: {
    //     products: {
    //       delete: {
    //         id: data.id
    //       },
    //     },
    //   },
    // });

    // console.log('deleteProduct', deleteProduct)
    // if (deleteProduct) return { success: true, message: `Локальный продукт с ID:${data.id} удален успешно` };
    // return {
    //   success: false,
    //   message: `Локальный продукт с ID:${data.id} не удален`
    // }
  }

}
