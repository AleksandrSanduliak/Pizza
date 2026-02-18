import AddIcon from '@mui/icons-material/Add';
import { Box, Fab, Typography } from '@mui/material';

const AddItem = ({ addItem }: { addItem: () => void }) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Typography>Добавить варианты продукта</Typography>
      <Fab
        onClick={() => addItem()}
        color='primary'
        size='small'
        aria-label='add'
        sx={{ marginY: '1rem', ml: '0.75rem' }}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default AddItem;
