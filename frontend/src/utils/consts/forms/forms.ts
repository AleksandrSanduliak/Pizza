import { IRegisterFormFields, TLoginFormFields } from 'utils/types/types';

export const loginFormList: TLoginFormFields[] = [
  {
    name: 'email',
    title: 'Email',
  },
  {
    name: 'password',
    title: 'Пароль',
  },
];

export const registerFormList: IRegisterFormFields[] = [
  ...loginFormList,
  {
    name: 'name',
    title: 'Имя',
  },
  // {
  //   name: 'email',
  //   title: 'Email',
  //   // isRegisterMask: true,
  //   // mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
  // },
  {
    name: 'phone',
    title: 'Номер телефона',
    isRegisterMask: true,
    mask: ['+7 999 999-99-99'],
    maskOptions: {
      required: true,
    },
  },
  {
    name: 'dateBrith',
    title: 'День рождения',
    isRegisterMask: true,
    mask: 'datetime',
    maskOptions: {
      inputFormat: 'dd-mm-yyyy',
      required: true,
    },
  },
  // {
  //   name: 'password',
  //   title: 'Пароль',
  // },
  {
    name: 'confirmPassword',
    title: 'Подтверждение пароля',
  },
];
