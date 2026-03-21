import { Box, Button } from '@mui/material';

import CityForm from '@/2-pages/CitiesCategories/ui/LocalProduct/CityForm';
import LocalProductModal from '@/2-pages/CitiesCategories/ui/LocalProduct/local-product-modal';

interface EditLocalProductModal<T> {
  isOpenModal: boolean;
  item: T;
  closeModal: () => void;
  deleteFn: () => void;
}
const EditLocalProductModal = <T,>({
  isOpenModal,
  item,
  closeModal,
  deleteFn,
}: EditLocalProductModal<T>) => {
  console.log('item', item);

  return (
    <div>
      <LocalProductModal
        isOpenModal={isOpenModal}
        closeModal={closeModal}
        children={
          <CityForm
            data={item}
            buttonSlot={
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button sx={{ width: 'min-content' }} type='submit'>
                  Изменить локальный продукт
                </Button>
                <Button
                  onClick={() => {
                    deleteFn();
                  }}
                  color='error'
                >
                  Удалить
                </Button>
              </Box>
            }
          />
        }
      />
    </div>
  );
};

export default EditLocalProductModal;
