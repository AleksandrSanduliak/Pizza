import { useGetGlobalProduct } from '@/2-pages/global-catalog/product/api/api';

import { Button } from '@mui/material';
import { useCreateLocalProduct } from '../../api/api';

import CityForm from '@/2-pages/CitiesCategories/ui/LocalProduct/CityForm';
import LocalProductModal from '@/2-pages/CitiesCategories/ui/LocalProduct/local-product-modal';

interface CreateLocalProductModal {
  isOpenModal: boolean;
  onClose: () => void;
  city: string;
  category: {
    category: string;
    id: number;
  };
  id: string;
}
const CreateLocalProductModal = ({
  isOpenModal,
  onClose,
  city,
  category,
  id,
}: CreateLocalProductModal) => {
  const { mutate: mutationFn } = useCreateLocalProduct(city);
  const { data: productData } = useGetGlobalProduct({
    category: category.category,
    id: Number(id),
  });
  const defaultValues = (productData) => {
    return {
      globalProductId: productData.id,
      localCategoryId: category.id,
      order: Number(productData.order),
      localProductItems: productData.variants.map((item) => {
        return {
          globalProductVariantId: item.id,
          price: item.price,
        };
      }),
    };
  };

  const onSubmit = (data) => {
    console.log('data', data);
    const updateData = defaultValues(data);
    // mutationFn(updateData);
  };

  console.log('productData create', productData);
  return (
    <LocalProductModal
      isOpenModal={isOpenModal}
      closeModal={onClose}
      children={
        <CityForm
          data={productData}
          onSubmit={onSubmit}
          buttonSlot={
            <Button sx={{ width: 'min-content' }} type='submit'>
              Создать локальный продукт
            </Button>
          }
        />
      }
    />
  );
};

export default CreateLocalProductModal;
