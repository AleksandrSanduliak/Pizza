import { useGetGlobalCategoryQuery } from '@/5-shared/api/Category';
import { Category } from '@entities/Category';
import { Box } from '@mui/material';
import { useParams } from 'react-router';

const GlobalCategory = () => {
  const params = useParams();

  if (!params || !params.category) {
    return <Box>Не найдена категория</Box>;
  }
  const { category } = params;
  const { data } = useGetGlobalCategoryQuery({ category: category });
  console.log('data', data);
  return <Category data={data} category={category} />;
};

export default GlobalCategory;
