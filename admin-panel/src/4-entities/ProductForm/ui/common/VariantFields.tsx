import { Box, Divider, Typography } from '@mui/material';
import { JSX, ReactNode } from 'react';

interface VariantFormInput {
  actionsSlot?: JSX.Element;
  variantFields: ReactNode;
  nutritionFactsFields: ReactNode;
}
const styles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  rowGap: '1rem',
};

const VariantFields = ({ actionsSlot, variantFields, nutritionFactsFields }: VariantFormInput) => {
  return (
    <Box sx={styles}>
      {actionsSlot && actionsSlot}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>{variantFields}</Box>
      <Box>
        <Typography sx={{ mb: 2 }}>Пищевая ценность</Typography>
        <Box sx={{ display: 'flex', gap: 2.5 }}>{nutritionFactsFields}</Box>
      </Box>
      <Divider sx={{ mt: 1, width: '100%' }} variant='fullWidth' component='div' />
    </Box>
  );
};

export default VariantFields;
