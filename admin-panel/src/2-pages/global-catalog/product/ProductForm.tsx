import ProductFormLayout from '@/4-entities/ProductForm/ProductFormLayout';
import {
  GlobalProductFormFields,
  NutritionFactsFormFields,
  VariantItemFormFields,
} from '@entities/ProductForm/ui/common/FormFields';
import VariantFields from '@entities/ProductForm/ui/common/VariantFields';
import VariantFieldsHeader from '@entities/ProductForm/ui/common/VariantFieldsHeader';
import RemoveItem from '@entities/ProductForm/ui/common/VariantFieldsHeader/Actions/RemoveItem';
import { Box, Button } from '@mui/material';
import { useCreateGlobalProduct } from '@shared/api/GlobalProduct';
import { variantItem } from '@shared/consts/constants';
import { SubmitHandler } from 'react-hook-form';

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

const ProductForm = ({ data, categoryName }) => {
  const { mutate: mutationFn } = useCreateGlobalProduct({ queryKey: categoryName });
  const onSubmit: SubmitHandler = (data) => {
    console.log('data', data);
    const updateData = { ...data, category: categoryName };
    mutationFn({ ...updateData });
  };
  return (
    <ProductFormLayout
      globalFieldsSlot={<GlobalProductFormFields />}
      // globalFieldsSlot={globalFields.renderFields}
      defaultValues={data}
      onSubmit={onSubmit}
      dynamicFieldsHeaderRenderProp={({ props }) => (
        <VariantFieldsHeader addItem={() => props.append(variantItem)} />
      )}
      dynamicFieldsRenderProp={({ field, props, fieldIndex }) => (
        <DynamicRenderField field={field} props={props} fieldIndex={fieldIndex} />
      )}
      buttonSlot={
        <Button sx={{ width: 'min-content' }} type='submit'>
          Изменить
        </Button>
      }
    />
  );
};

export default ProductForm;
