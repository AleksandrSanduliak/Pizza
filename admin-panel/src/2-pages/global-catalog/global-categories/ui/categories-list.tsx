import { Box } from '@mui/material';
import type { CategoryItem } from '@shared/interface/category-interface';
import CartItemSkeleton from '@shared/ui/components/CardItem/CartItemSkeleton';
import CategoryCardItem from '@shared/ui/components/CardItem/CategoryCardItem';
import { ReactNode } from 'react';

interface CategoriesContent {
  data:
    | {
        categories: CategoryItem[] | undefined;
        totalCount: number;
      }
    | undefined;
  isError: boolean;
  isLoading: boolean;
  error: Error | null;
  emptyDataSlot?: ReactNode | Promise<ReactNode> | undefined;
}

const CategoriesList = ({ data, isLoading, isError, error, emptyDataSlot }: CategoriesContent) => {
  console.log('isLoading', isLoading);
  const { categories = [], totalCount = 0 } = data || {};
  const hasData = Array.isArray(categories) && categories.length > 0;

  if (isLoading && !hasData) {
    console.log('data is loading', data);
    const skeletonLength = totalCount > 0 ? totalCount : 6;
    return (
      <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
        {Array.from({ length: skeletonLength }).map(
          (
            _,
            index // TODO: пробросить ключи и вытащить xtotalcount
          ) => (
            <Box key={`${index}_categories_list_skeleton`} sx={{ width: 175 }}>
              <CartItemSkeleton />
            </Box>
          )
        )}
      </Box>
    );
  }

  if (isError) {
    console.error('error', error);
    return (
      <Box>При запросе категорий произошла ошибка. Обратитесь к администратору за информацией.</Box>
    );
  }

  if (!hasData) {
    return emptyDataSlot ? (
      emptyDataSlot
    ) : (
      <div>
        <p>Категории пока не созданы</p>
        <p>Создайте первую категорию чтобы начать работу</p>
      </div>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
      {categories.map((category) => {
        return (
          <Box key={category.category} sx={{ width: 175 }}>
            <CategoryCardItem
              title={category.categoryTitle}
              categoryName={category.category}
              itemsLength={category.products?.length ?? 0}
            />
          </Box>
        );
      })}
    </Box>
  );
};

export default CategoriesList;
