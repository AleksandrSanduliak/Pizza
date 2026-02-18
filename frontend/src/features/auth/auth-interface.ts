export type LoginFormFields = {
  name: string;
  title: string;
};

export interface RegisterFormFields extends LoginFormFields {
  isRegisterMask?: boolean;
  maskOptions?: object;
  mask?: string | string[];
  type?: string;
}
