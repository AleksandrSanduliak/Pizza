import ProductFormLayout from '@entities/ProductForm/ProductFormLayout';
import {
  GlobalProductFormFields,
} from '@entities/ProductForm/ui/common/FormFields';
import { Button } from '@mui/material';
import { useCreateGlobalProduct } from '@shared/api/GlobalProduct';
import { variantItem } from '@shared/consts/constants';
import { GlobalProduct } from '@shared/interface/global-product-interface';
import { SubmitHandler } from 'react-hook-form';
import DynamicRenderField from '../../ProductForm/ui/common/DynamicRenderFields';
import VariantFieldsHeader from '../../ProductForm/ui/common/VariantFieldsHeader';

const CategoryForm = ({ categoryName }: { categoryName: string }) => {
  const { mutate: mutationFn } = useCreateGlobalProduct({ queryKey: categoryName });
  const onSubmit: SubmitHandler<GlobalProduct> = (data: GlobalProduct) => {
    console.log('data', data);
    const updateData: GlobalProduct = { ...data, category: categoryName };
    mutationFn(updateData);
  };
  return (
    <ProductFormLayout<GlobalProduct>
      globalFieldsSlot={<GlobalProductFormFields />}
      onSubmit={onSubmit}
      dynamicFieldsHeaderRenderProp={({ props }) => (
        <VariantFieldsHeader addItem={() => props.append(variantItem)} />
      )}
      dynamicFieldsRenderProp={({ field, props, fieldIndex }) => (
        <DynamicRenderField field={field} props={props} fieldIndex={fieldIndex} />
      )}
      buttonSlot={
        <Button sx={{ width: 'min-content' }} type='submit'>
          Создать
        </Button>
      }
    />
  );
};

export default CategoryForm;
