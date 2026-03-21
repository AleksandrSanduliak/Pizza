import ProductFormLayout from '@entities/ProductForm/ProductFormLayout';
import {
  LocalProductFormFields,
  LocalVariantItemFormFields,
  NutritionFactsFormFields,
} from '@entities/ProductForm/ui/common/FormFields';
import VariantFields from '@entities/ProductForm/ui/common/VariantFields';
import { Box, Typography } from '@mui/material';
import { ReactNode } from 'react';
import { FieldValues } from 'react-hook-form';

const DynamicRenderField = ({ field, props, fieldIndex }) => {
  return (
    <VariantFields
      variantFields={
        <LocalVariantItemFormFields
          index={fieldIndex}
          variandId={field.id}
          fieldsProps={{
            title: {
              disabled: true,
            },
            sizeName: {
              disabled: true,
            },
            size: {
              disabled: true,
            },
            desc: {
              disabled: true,
            },
            imageUrl: {
              disabled: true,
            },
          }}
        />
      }
      nutritionFactsFields={
        <NutritionFactsFormFields
          index={fieldIndex}
          variandId={field.id}
          fieldsProps={{
            proteins: {
              disabled: true,
            },
            fats: {
              disabled: true,
            },
            carbs: {
              disabled: true,
            },
            calories: {
              disabled: true,
            },
            weight: {
              disabled: true,
            },
          }}
        />
      }
      actionsSlot={
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'center' }}>
          <Typography>Вариант продукта: {field.title}</Typography>
        </Box>
      }
    />
  );
};

const CityForm = <T extends FieldValues>({
  data,
  onSubmit,
  buttonSlot,
}: {
  data: T;
  onSubmit?: (data: T) => void;
  buttonSlot: ReactNode;
}) => {
  if (!data) {
    return <div>...loading</div>;
  }

  return (
    <ProductFormLayout
      globalFieldsSlot={
        <LocalProductFormFields
          fieldsProps={{
            title: {
              disabled: true,
            },
            caption: {
              disabled: true,
            },
            desc: {
              disabled: true,
            },
            imageUrl: {
              disabled: true,
            },
          }}
        />
      }
      defaultValues={data}
      onSubmit={onSubmit}
      dynamicFieldsRenderProp={({ field, props, fieldIndex }) => (
        <DynamicRenderField field={field} props={props} fieldIndex={fieldIndex} />
      )}
      buttonSlot={buttonSlot}
    />
  );
};

export default CityForm;
