import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CityService {
  constructor(private readonly prismaService: PrismaService) {
    // console.log('=== ДИАГНОСТИКА CityService ===');
    // // console.log('1. this.prisma:', this.prismaService);
    // console.log('2. this.prisma?.productCategory:', this.prismaService?.city);
    // // console.log('3. Методы prisma:', Object.keys(this.prismaService || {}));
    // console.log('=========================================');
  }
  async cityList() {
    console.log('123');
    return await this.prismaService.city.findMany({
      select: {
        city: true,
        name: true,
        url: true,
      },
    });
  }

  async cityCatalog(city: string) {
    const getCity = await this.prismaService.city.findUnique({
      where: {
        city: city,
      },
      include: {
        // restaurants: true,
        categories: {
          include: {
            products: {
              include: {
                globalProduct: true,
                localProductItems: {
                  include: {
                    globalProductVariant: true,
                  },
                },
              },
            },
            productCategory: true,
          },
        },
      },
    });
    if (!getCity) {
      return null;
    }
    const mapData =
      // ...getCity,
      // categories:
      getCity?.categories?.length > 0
        ? getCity.categories.map((category) => {
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
                      ...localProduct.globalProductVariant,
                    };
                  }),
                };
              }),
            };
          })
        : [];

    return mapData;
  }

  async cityInfo(city: string) {
    if (!city) return null;
    const getCity = await this.prismaService.city.findUnique({
      where: {
        city: city,
      },
      include: {
        restaurants: true,
        // categories: true,
      },
    });
    console.log('getCity', getCity);
    if (!getCity) {
      return null;
    }
    return getCity;
    // const getCategoriesList = getCity.categories.map((item) => {
    //   console.log('item');
    // });
  }
}
