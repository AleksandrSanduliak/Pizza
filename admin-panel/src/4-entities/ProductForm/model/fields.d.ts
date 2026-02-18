import { type BaseTextFieldProps } from '@mui/material';

export interface BaseFormFieldType {
  label: string;
  name: string;
  component: JSX.Element;
}

export type FormFieldView = {
  name: string;
  label: string;
} & BaseTextFieldProps;

export interface Field {
  label: string;
  name: string;
  id: string;
  tooltipTitle?: string;
  fieldProps?: FieldProps
}

export interface FormField extends Field {
  component: (props: Field) => JSX.Element;
}

export type VariantFormFields = {
  fields: FormField[];
  renderFields: React.ReactNode;
};

type FieldProps = {
  value?: string | number
  disabled?: boolean
}
export type FieldsProps = Record<T, FieldsProps>

export type CreateFormFieldsInput<T> = {
  renderFn?: (fields: FormField[]) => React.ReactNode;
  fieldsProps?: FieldsProps
};
export type CreateFormFieldsOutput = {
  fields: FormField[];
  renderFields: React.ReactNode;
};