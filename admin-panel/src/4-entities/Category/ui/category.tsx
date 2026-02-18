import { CategoryItem } from '@/5-shared/interface/category-interface';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import CategoryForm from './category-form';
import CategoryTable from './category-table';

const CreateGlobalProduct = ({ categoryName }: { categoryName: string }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id='create-global-product-panel-header'>
        <Typography component='span'>Создать глобальный продукт</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CategoryForm categoryName={categoryName} />
      </AccordionDetails>
    </Accordion>
  );
};

const Category = <T extends CategoryItem>({ data, category }: { data: T; category: string }) => {
  if (!category) {
    console.log('нет категории');
    return;
  }

  if (!data) {
    return;
  }

  const { category: categoryName, categoryTitle, products } = data;
  if (!categoryName || !categoryTitle) {
    return;
  }

  return (
    <div>
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <div>Категория {categoryTitle}</div>
          <div>Уникальный ключ {categoryName}</div>
        </Box>
      )}

      <CreateGlobalProduct categoryName={categoryName} />
      <Typography>Список продуктов категории</Typography>
      {products.length > 0 && <CategoryTable products={products} category={category} />}
    </div>
  );
};

export default Category;
