import { Tooltip } from '@mui/material';
import NumberFormField from '@shared/ui/components/Forms/fields/NumberFormField/NumberFormField';
import TextFormField from '@shared/ui/components/Forms/fields/TextFormField/TextFormField';
import type { FieldsProps } from '../../model/fields';

export const GlobalProductFormFields = ({ fieldsProps }: { fieldsProps?: FieldsProps }) => {
  return (
    <>
      <Tooltip placement='top-start' title='Заголовок на русском языке'>
        <TextFormField
          id='global-field-title'
          name='title'
          label='Заголовок'
          required
          {...(fieldsProps?.title && fieldsProps.title)}
        />
      </Tooltip>

      <Tooltip
        placement='top-start'
        title='Название на латинице в kebab-case. Пример: burger-pizza, cheese, teriyaki, cappuccino'
      >
        <TextFormField
          id='global-field-caption'
          name='caption'
          label='caption'
          required
          sx={{ width: 300 }}
          {...(fieldsProps?.caption && fieldsProps.caption)}
        />
      </Tooltip>

      <TextFormField
        id='global-field-desc'
        name='desc'
        label='Описание'
        fullWidth
        required
        multiline
        rows={4}
        {...(fieldsProps?.desc && fieldsProps.desc)}
      />

      <TextFormField
        id='global-field-image-url'
        name='imageUrl'
        label='URL картинки'
        fullWidth
        required
        {...(fieldsProps?.imageUrl && fieldsProps.imageUrl)}
      />
    </>
  );
};

export type VariantFields = {
  title: string;
  sizeName: string;
  size: string;
  desc: string;
};
export const VariantItemFormFields = ({
  index,
  variandId,
  fieldsProps,
}: {
  index: number;
  variandId: string;
  fieldsProps?: FieldsProps;
}) => {
  const namePrefix = (name: string) => `variants.${index}.${name}`;

  return (
    <>
      <TextFormField
        id={namePrefix('title')}
        name={namePrefix('title')}
        label='Заголовок'
        required
        {...(fieldsProps?.title && fieldsProps.title)}
      />

      <TextFormField
        id={namePrefix('sizeName')}
        name={namePrefix('sizeName')}
        label='Название порции'
        required
        {...(fieldsProps?.sizeName && fieldsProps.sizeName)}
      />

      <Tooltip placement='top-start' title='Пример: 0.5л, 0.5 кг, 1шт, 25см'>
        <TextFormField
          id={namePrefix('size')}
          name={namePrefix('size')}
          label='Размер порции'
          required
          {...(fieldsProps?.size && fieldsProps.size)}
        />
      </Tooltip>

      <TextFormField
        id={namePrefix('imageUrl')}
        name={namePrefix('imageUrl')}
        label='URL картинки'
        fullWidth
        required
        {...(fieldsProps?.imageUrl && fieldsProps.imageUrl)}
      />

      <TextFormField
        id={namePrefix('desc')}
        name={namePrefix('desc')}
        label='Описание'
        required
        multiline
        rows={4}
        fullWidth
        {...(fieldsProps?.desc && fieldsProps.desc)}
      />
    </>
  );
};

export const NutritionFactsFormFields = ({
  index,
  variandId,
  fieldsProps,
}: {
  index: number;
  variandId: string;
  fieldsProps?: FieldsProps;
}) => {
  const prefix = `variants.${index}.nutritionFacts`;

  return (
    <>
      {/* Поле: Белки */}
      <NumberFormField
        id={`${prefix}.proteins`}
        name={`${prefix}.proteins`}
        label='Белки'
        required
        {...(fieldsProps?.proteins && fieldsProps.proteins)}
      />

      {/* Поле: Жиры */}
      <NumberFormField
        id={`${prefix}.fats`}
        name={`${prefix}.fats`}
        label='Жиры'
        required
        {...(fieldsProps?.fats && fieldsProps.fats)}
      />

      {/* Поле: Углеводы */}
      <NumberFormField
        id={`${prefix}.carbs`}
        name={`${prefix}.carbs`}
        label='Углеводы'
        required
        {...(fieldsProps?.carbs && fieldsProps.carbs)}
      />

      {/* Поле: Калории */}
      <NumberFormField
        id={`${prefix}.calories`}
        name={`${prefix}.calories`}
        label='Калории'
        required
        {...(fieldsProps?.calories && fieldsProps.calories)}
      />

      {/* Поле: Вес */}
      <Tooltip
        placement='top-start'
        title='Введите вес на порцию с единицами измерения. Пример: 350 г, 500 г'
      >
        <NumberFormField
          id={`${prefix}.weight`}
          name={`${prefix}.weight`}
          label='Вес'
          required
          {...(fieldsProps?.weight && fieldsProps.weight)}
        />
      </Tooltip>
    </>
  );
};

export const LocalProductFormFields = ({ fieldsProps }: { fieldsProps?: FieldsProps }) => {
  return (
    <>
      {/* Поле: Заголовок */}
      <Tooltip placement='top-start' title='Заголовок на русском языке'>
        <TextFormField
          id='global-field-title'
          name='title'
          label='Заголовок'
          required
          {...(fieldsProps?.title && fieldsProps.title)}
        />
      </Tooltip>

      {/* Поле: caption */}
      <Tooltip
        placement='top-start'
        title='Название на латинице в kebab-case. Пример: burger-pizza, cheese, teriyaki, cappuccino'
      >
        <TextFormField
          id='global-field-caption'
          name='caption'
          label='caption'
          required
          sx={{ width: 300 }}
          {...(fieldsProps?.caption && fieldsProps.caption)}
        />
      </Tooltip>

      {/* Поле: Положение продукта в категории */}
      <NumberFormField
        id='local-field-order'
        name='order'
        label='Положение продукта в категории'
        required
        {...(fieldsProps?.order && fieldsProps.order)}
      />

      {/* Поле: Описание */}
      <TextFormField
        id='global-field-desc'
        name='desc'
        label='Описание'
        fullWidth
        required
        multiline
        rows={4}
        {...(fieldsProps?.desc && fieldsProps.desc)}
      />

      {/* Поле: URL картинки */}
      <TextFormField
        id='global-field-image-url'
        name='imageUrl'
        label='URL картинки'
        fullWidth
        required
        {...(fieldsProps?.imageUrl && fieldsProps.imageUrl)}
      />
    </>
  );
};

export const LocalVariantItemFormFields = ({
  index,
  variandId,
  fieldsProps,
}: {
  index: number;
  variandId: string;
  fieldsProps?: FieldsProps;
}) => {
  const namePrefix = (name: string) => `variants.${index}.${name}`;

  return (
    <>
      <TextFormField
        id={namePrefix('title')}
        name={namePrefix('title')}
        label='Заголовок'
        required
        {...(fieldsProps?.title && fieldsProps.title)}
      />

      <TextFormField
        id={namePrefix('sizeName')}
        name={namePrefix('sizeName')}
        label='Название порции'
        required
        {...(fieldsProps?.sizeName && fieldsProps.sizeName)}
      />

      <Tooltip placement='top-start' title='Пример: 0.5л, 0.5 кг, 1шт, 25см'>
        <TextFormField
          id={namePrefix('size')}
          name={namePrefix('size')}
          label='Размер порции'
          required
          {...(fieldsProps?.size && fieldsProps.size)}
        />
      </Tooltip>

      <Tooltip placement='top-start' title='Пример: 0.5л, 0.5 кг, 1шт, 25см'>
        <NumberFormField
          id={namePrefix('price')}
          name={namePrefix('price')}
          label='Цена'
          required
          {...(fieldsProps?.price && fieldsProps.price)}
        />
      </Tooltip>

      <TextFormField
        id={namePrefix('imageUrl')}
        name={namePrefix('imageUrl')}
        label='URL картинки'
        fullWidth
        required
        {...(fieldsProps?.imageUrl && fieldsProps.imageUrl)}
      />

      <TextFormField
        id={namePrefix('desc')}
        name={namePrefix('desc')}
        label='Описание'
        required
        multiline
        rows={4}
        fullWidth
        {...(fieldsProps?.desc && fieldsProps.desc)}
      />
    </>
  );
};
