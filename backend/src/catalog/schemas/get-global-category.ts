export const getGlobalCategorySchema = (category: string) => {
  return {
    where: {
      category: category,
    },
    select: {
      category: true,
      categoryTitle: true,
      products: true,
    },
  };
};
