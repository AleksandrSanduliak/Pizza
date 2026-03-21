import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from '@mui/material';
import CategoryForm from './category-form';
import CategoryTable from './category-table';
import { GetGlobalCategory } from '@/5-shared/api/schemas/get-global-category.schema';

const CreateGlobalProduct = ({ categoryName }: { categoryName: string }) => {
  return (
    <Accordion sx={{ border: '1px solid black' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />} id='create-global-product-panel-header'>
        <Typography component='span'>Создать глобальный продукт</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <CategoryForm categoryName={categoryName} />
      </AccordionDetails>
    </Accordion>
  );
};

const Category = <T extends GetGlobalCategory>({
  data,
  category,
}: {
  data: T | undefined;
  category: string;
}) => {
  console.log('data, category', data, category);
  if (!data) return <div>...loading</div>;
  const { category: categoryName, categoryTitle, products } = data;

  return (
    <div>
      {data && (
        <Box sx={{ display: 'flex', flexDirection: 'column', marginBottom: '1rem' }}>
          <div>Категория: {categoryTitle}</div>
          <div>Уникальный ключ: {categoryName}</div>
        </Box>
      )}

      <CreateGlobalProduct categoryName={category} />
      <Typography sx={{ marginTop: '2rem' }}>Список продуктов категории:</Typography>
      {products.length > 0 ? (
        <CategoryTable products={data.products} category={category} />
      ) : (
        <Box sx={{ marginTop: '0.5rem' }}>Список продуктов пустой, создайте первый продукт.</Box>
      )}
    </div>
  );
};

export default Category;
