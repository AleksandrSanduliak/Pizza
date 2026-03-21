import { Prisma } from '@prisma/generated/prisma/client';
const formatCityCategories = (
  categories: Prisma.LocalCategoryOrderByWithRelationInput[],
) => {
  return categories.map((category) => {
    return {
      id: category.id,

      cityId: category.cityId,
      category: category.productCategory.category,
      categoryTitle: category.productCategory.categoryTitle,
      products: category.products.map((product) => {
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
  });
};

export const mapCityCategoriesData = (
  categories: Prisma.LocalCategoryOrderByWithRelationInput[],
) => {
  return formatCityCategories(categories);
};
