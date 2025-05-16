import { ActionCreatorWithPayload } from '@reduxjs/toolkit';
import { AppDispatch } from 'store/store';
import { setCookie } from './cookie';

export const setCookieAndDispatch = (
  city: string,
  dispatch: AppDispatch,
  // импорт стандартного дженерика слайса
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  slice: ActionCreatorWithPayload<any, string>,
) => {
  setCookie('location', city, 30);
  dispatch(slice(city));
};
