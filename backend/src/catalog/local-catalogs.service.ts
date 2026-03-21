import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { City, Prisma } from '@prisma/generated/prisma/client';
import { mapCityCategoriesData } from 'src/catalog/utils/map-city-categories';
import { CityService } from 'src/prisma/catalog/local/city.service';
// import { CityService } from 'src/city/city.service';

import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LocalProductService {
  constructor(
    private prisma: PrismaService,
    private prismaAdapter: PrismaAdapter,
    private readonly cityService: CityService,
  ) {}

  async getCitiesList() {
    const getCitiesList = await this.cityService.getCitiesList();
    console.log('getCitiesList', getCitiesList);
    return getCitiesList;
  }

  async getCityData(city: string): Promise<City> {
    const getCity: City = await this.prisma.city.findUnique(
      getCitySchema(city),
    );
    const categories =
      getCity.categories?.length !== 0
        ? mapCityCategoriesData(getCity.categories)
        : [];
    const formattingData = {
      ...getCity,
      categories,
    };
    console.log('getCity', getCity);
    console.log('mapData', formattingData);
    return formattingData;
  }
  async createCity(data: { data: Prisma.CityCreateInput }) {
    const validateData = { ...data.data, city: data.data.city.toLowerCase() };
    const createCity = await this.cityService.createCity({
      data: validateData,
    });
    return createCity;
  }

  async createLocalCategory({ data }) {
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

    return createCategory;
  }
  async createLocalProduct({ data }) {
    console.log('data', data);
    const processVariants = data.localProductItems.map((item) => item.price);
    console.log('processVariants', processVariants);
    const findMinPriceValue = Math.min(...processVariants);
    console.log('findMinPriceValue', findMinPriceValue);
    const updatedData = structuredClone(data);
    updatedData.price = findMinPriceValue.toString();
    const transformedData = this.prismaAdapter.toCreateNested(updatedData);
    console.log('transformedData', transformedData);
    const createData = {
      price: findMinPriceValue.toString(),
      order: data.order || '0',

      globalProduct: {
        connect: { id: parseInt(data.globalProductId, 10) },
      },

      localCategory: {
        connect: { id: parseInt(data.localCategoryId, 10) },
      },

      localProductItems: {
        create: data.localProductItems.map((item) => ({
          price: item.price,
          globalProductVariant: {
            connect: { id: item.globalProductVariantId },
          },
        })),
      },
    };
    const createLocalProductRequest = await this.prisma.localProduct.create({
      data: createData,
    });
  }
  async deleteLocalProduct({
    data,
  }: {
    data: { productId: number; category: string; cityId: number };
  }) {
    console.log('data id', data.productId);
    if (!data.category || !data.cityId || !data.productId)
      throw new BadRequestException('Отсутствует категория или ID в запросе');

    const deleteProduct = await this.prisma.localProduct.delete({
      where: {
        id: data.productId,
        localCategory: {
          cityId: data.cityId,
          category: data.category,
        },
      },
    });
    return {
      deleteProduct,
    };
  }
}
