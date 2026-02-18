import { Box } from '@mui/material';
import AddItem from './VariantFieldsHeader/Actions/AddItem';

interface VariantFieldInput {
  addItem: () => void;
}

const VariantFieldsHeader = ({ addItem }: VariantFieldInput) => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <AddItem addItem={addItem} />
    </Box>
  );
};

export default VariantFieldsHeader;
