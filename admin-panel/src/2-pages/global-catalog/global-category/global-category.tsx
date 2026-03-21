import { useGetGlobalCategoryQuery } from '@/5-shared/api/Category';
import { Category } from '@entities/Category';
import { Box } from '@mui/material';
import { useParams } from 'react-router';

const GlobalCategory = () => {
  const params = useParams();

  if (!params || !params.category) {
    return <Box>Не найдена категория</Box>;
  }
  const { category: categoryName } = params;
  const { data: categoryData } = useGetGlobalCategoryQuery({ category: categoryName });
  console.log('data', categoryData);
  return <Category data={categoryData} category={categoryName} />;
};

export default GlobalCategory;
