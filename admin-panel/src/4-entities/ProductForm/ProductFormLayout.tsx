import { Box, Stack } from '@mui/material';
import {
  ArrayPath,
  DefaultValues,
  FieldArrayWithId,
  FieldValues,
  FormProvider,
  SubmitHandler,
  useFieldArray,
  UseFieldArrayReturn,
  useForm,
} from 'react-hook-form';
const styles = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  gap: '1rem',
};

type FieldsType<T extends FieldValues> = FieldArrayWithId<T, ArrayPath<T>, 'id'>;
type UseFieldsProps<T extends FieldValues> = Omit<
  UseFieldArrayReturn<T, ArrayPath<T>, 'id'>,
  'fields'
>;

interface ProductFormLayout<TSubmitHandlerFields extends FieldValues> {
  onSubmit: SubmitHandler<TSubmitHandlerFields>;
  globalFieldsSlot: React.ReactNode;
  buttonSlot: React.ReactNode;
  fieldArrayName?: ArrayPath<TSubmitHandlerFields>;
  defaultValues?: DefaultValues<TSubmitHandlerFields> | undefined;
  dynamicFieldsHeaderRenderProp?: ({
    props,
  }: {
    props: UseFieldsProps<TSubmitHandlerFields>;
  }) => React.ReactNode;
  dynamicFieldsRenderProp: ({
    field,
    props,
    fieldIndex,
  }: {
    field: FieldsType<TSubmitHandlerFields>;
    props: UseFieldsProps<TSubmitHandlerFields>;
    fieldIndex: number;
  }) => React.ReactNode;
}
const ProductFormLayout = <T extends FieldValues>({
  onSubmit,
  globalFieldsSlot,
  buttonSlot,
  fieldArrayName = 'variants' as ArrayPath<T>,
  defaultValues,
  dynamicFieldsHeaderRenderProp,
  dynamicFieldsRenderProp,
}: ProductFormLayout<T>) => {
  const methods = useForm<T>({ defaultValues: defaultValues as DefaultValues<T> | undefined });
  const { handleSubmit, control } = methods;
  const { fields, ...useFieldsMethods } = useFieldArray({
    name: fieldArrayName,
    control,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box>
          <Stack
            sx={{ display: 'flex', flexDirection: 'column', flexWrap: 'wrap' }}
            direction='column'
            spacing={2}
            useFlexGap
          >
            <Box sx={styles}>{globalFieldsSlot}</Box>
            {dynamicFieldsHeaderRenderProp &&
              dynamicFieldsHeaderRenderProp({ props: useFieldsMethods })}
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6, mt: 4 }}>
              {fields.map((field, index) =>
                dynamicFieldsRenderProp({
                  field: field,
                  props: useFieldsMethods,
                  fieldIndex: index,
                })
              )}
            </Box>
            {buttonSlot}
          </Stack>
        </Box>
      </form>
    </FormProvider>
  );
};

export default ProductFormLayout;
