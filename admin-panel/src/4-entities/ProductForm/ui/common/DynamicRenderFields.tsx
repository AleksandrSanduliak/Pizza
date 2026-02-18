import { Box } from '@mui/material';
import { NutritionFactsFormFields, VariantItemFormFields } from './FormFields';
import VariantFields from './VariantFields';
import RemoveItem from './VariantFieldsHeader/Actions/RemoveItem';

const DynamicRenderField = ({ field, props, fieldIndex }) => {
  return (
    <VariantFields
      variantFields={<VariantItemFormFields index={fieldIndex} variandId={field.id} />}
      nutritionFactsFields={<NutritionFactsFormFields index={fieldIndex} variandId={field.id} />}
      actionsSlot={
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Box sx={{ marginLeft: 'auto' }}>
            <RemoveItem removeItem={() => props.remove(fieldIndex)} />
          </Box>
        </Box>
      }
    />
  );
};

export default DynamicRenderField;
