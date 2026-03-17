import { PrismaClientKnownRequestError } from '@prisma/client/runtime/client';
import { CreateGlobalCategoyDTO } from './dto/global-product/create-category.dto';
import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { GetGlobalProductDTO } from 'src/admin-panel/dto/get-global-product.dto';
// import { PrismaAdapter } from 'src/prisma/prisma.adapter';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class GlobalProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getCategory(category: string) {
    const findedCategory = await this.prisma.globalProduct.findMany({
      where: {
        category: category,
      },
    });
    if (!findedCategory)
      throw new BadRequestException('Не найдена запрашиваемая категория');
    return findedCategory;
  }
  async getGlobalProducs() {
    const getGlobalProducs = await this.prisma.globalProduct.findMany({
      include: {
        variants: true,
      },
    });

    return getGlobalProducs;
  }

  async createGlobalProduct({ data }) {
    // const transformedData = this.prismaAdapter.toCreateNested(data);
    // console.log('transformedData', transformedData);
    // const getGlobalProducs = await this.prisma.globalProduct.create({
    //   data: transformedData,
    // });
    // return getGlobalProducs;
  }

  async deleteGlobalProduct({
    data,
  }: {
    data: { category: string; id: number };
  }) {
    if (!data.category || !data.id)
      throw new BadRequestException('Отсутствует категория или ID в запросе');
    const deleteProduct = await this.prisma.productCategory.update({
      where: {
        category: data.category,
      },
      data: {
        products: {
          delete: {
            id: data.id,
          },
        },
      },
    });

    console.log('deleteProduct', deleteProduct);
    if (deleteProduct)
      return {
        success: true,
        message: `Глобальный продукт с ID:${data.id} удален успешно`,
      };
    return {
      success: false,
      message: `Глобальный продукт с ID:${data.id} не удален`,
    };
  }

  async updateGlobalProduct({ data }) {
    // const transformedData = this.prismaAdapter.toUpdateNested(data);
    // console.log('transformedData', JSON.stringify(transformedData));
    // const updateGlobalProduct = await this.prisma.globalProduct.update({
    //   where: {
    //     category: data.category,
    //     id: data.id,
    //   },
    //   data: transformedData,
    // });
    // return updateGlobalProduct;
  }
  async getGlobalCategory(category: string) {
    const findUnique = await this.prisma.productCategory.findUnique({
      where: {
        category: category,
      },
      include: {
        products: {},
      },
    });
    return findUnique;
  }

  async getGlobalCategories() {
    const globalCategories = await this.prisma.productCategory.findMany();
    return {
      globalCategories: globalCategories,
      totalCount: globalCategories.length ?? 0,
    };
  }

  async createGlobalCategory({
    categoryData,
  }: {
    categoryData: CreateGlobalCategoyDTO;
  }) {
    console.log('categoryData', categoryData);
    try {
      const { category, categoryTitle } = categoryData;

      const createCategory = await this.prisma.productCategory.create({
        data: {
          category: category,
          categoryTitle: categoryTitle,
        },
      });
      console.log('createCategory', createCategory);
      return createCategory;
    } catch (error) {
      console.log('error', error);
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002')
          throw new ConflictException(
            'Категория уже существует, создайте с другим ключем',
          );
        throw new BadRequestException('Неизвестная ошибка создания категории');
      }
      throw error;
    }
  }

  async getGlobalProduct({ category, id }: GetGlobalProductDTO) {
    const globalProduct = await this.prisma.globalProduct.findFirst({
      where: {
        category,
        id,
      },
      include: {
        variants: {
          include: {
            nutritionFacts: true,
          },
        },
      },
    });
    console.log('globalProduct 12', globalProduct);
    return globalProduct;
  }
}
