import { Box } from '@mui/material';

interface ProductCategories {
  title: string;
  name: string;
}
const ProductCategories = ({ title, name }: ProductCategories) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <div>Категория {title}</div>
      <div>Уникальный ключ {name}</div>
    </Box>
  );
};

export default ProductCategories;
