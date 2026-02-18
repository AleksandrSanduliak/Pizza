import CategoriesContent from '@/2-pages/Categories/ui/CategoriesList/CategoriesContent';
import { Box } from '@mui/material';
import { useGetGlobalCategoriesQuery } from '@shared/api/Category';
import CreateCategoryModal from './CreateCategoryModal';

const Categories = () => {
  const { data: productCategories, isError, isLoading, error } = useGetGlobalCategoriesQuery();
  return (
    <>
      <CreateCategoryModal />

      <Box sx={{ mt: 4 }}>
        <CategoriesContent
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
