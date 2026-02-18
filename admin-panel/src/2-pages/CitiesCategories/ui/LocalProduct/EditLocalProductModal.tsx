import { Box, Button } from '@mui/material';
import { useDeleteLocalProductMutation } from '../../api/api';
import LocalProductModal from './LocalProductModal';

interface EditLocalProductModal {
  isOpenModal: boolean;
  item: any;
  closeModal: () => void;
  deleteFn: () => void;
}
const EditLocalProductModal = ({
  isOpenModal,
  item,
  closeModal,
  deleteFn,
}: EditLocalProductModal) => {
  console.log('item', item);

  return (
    <div>
      <LocalProductModal
        productData={item}
        onSubmit={() => console.log('onsubmit')}
        isOpenModal={isOpenModal}
        closeModal={closeModal}
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
      123
    </div>
  );
};

export default EditLocalProductModal;
