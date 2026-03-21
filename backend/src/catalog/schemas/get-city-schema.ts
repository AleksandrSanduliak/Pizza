const getCitySchema = (city: string) => {
  return {
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
                  globalProductVariant: true,
                },
              },
            },
          },
          productCategory: true,
        },
      },
    },
  };
};
