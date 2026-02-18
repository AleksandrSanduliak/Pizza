import { useUpdateGlobalProductMutation } from '@shared/api/GlobalProduct';
import { Box } from '@mui/material';
import { useParams } from 'react-router';
import { useGetGlobalProduct } from './api/api';
import ProductForm from './ProductForm';

const Products = () => {
  const { id, category } = useParams();
  if (!id || !category) {
    return `не обнаружен id или категория`;
  }
  const { data: productData } = useGetGlobalProduct({ category, id: Number(id) });
  const { mutate: mutationFn } = useUpdateGlobalProductMutation({
    queryKeys: ['globalCategories', category, id],
  });
  console.log('productData', productData);
  if (!productData) {
    return <div> loading</div>;
  }

  return (
    <Box>
      <Box sx={{ mt: 4 }}>
        <ProductForm data={productData} categoryName={category} />
      </Box>
    </Box>
  );
};

export default Products;
