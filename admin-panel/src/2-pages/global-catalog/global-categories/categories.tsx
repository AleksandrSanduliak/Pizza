import { Box } from '@mui/material';
import { useGetGlobalCategoriesQuery } from '@shared/api/Category';
import CreateCategoryModal from './ui/create-category-form';
import CategoriesList from '@/2-pages/global-catalog/global-categories/ui/categories-list';

const Categories = () => {
  const { data: productCategories, isError, isLoading, error } = useGetGlobalCategoriesQuery();
  return (
    <>
      <CreateCategoryModal />

      <Box sx={{ mt: 4 }}>
        <CategoriesList
          data={productCategories}
          isError={isError}
          isLoading={isLoading}
          error={error}
        />
      </Box>
    </>
  );
};
export default Categories;
