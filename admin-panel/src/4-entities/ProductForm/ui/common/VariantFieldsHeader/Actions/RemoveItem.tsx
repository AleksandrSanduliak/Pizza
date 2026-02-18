import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Box, Fab } from '@mui/material';

const RemoveItem = ({ removeItem }: { removeItem: () => void }) => {
  return (
    <Box>
      <Fab
        onClick={() => removeItem()}
        color='primary'
        size='small'
        aria-label='add'
        sx={{ marginY: '1rem', ml: '0.75rem' }}
      >
        <RemoveCircleOutlineIcon />
      </Fab>
    </Box>
  );
};

export default RemoveItem;
