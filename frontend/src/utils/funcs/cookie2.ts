'use server';

import { cookies } from 'next/headers';

import { expriesOptions } from 'utils/consts/cookie';

interface ISetCookie {
  name: string;
  value: string;
  expiresValue: number;
  expiresType: 'days' | 'minutes';
}
async function setCookie({ name, value, expiresValue, expiresType = 'days' }: ISetCookie) {
  'use server';
  // let expires: number = 1000;

  const date = new Date();
  if (expiresType === 'days') date.setTime(date.getTime() + expiresValue * expriesOptions.day);

  if (expiresType === 'minutes')
    date.setTime(date.getTime() + expiresValue * expriesOptions.minutes);

  (await cookies()).set(name, value, { expires: date });
}

async function getCookie(name: string) {
  'use server';
  const cookieStore = await cookies();
  const cookie = cookieStore.get(name);
  return cookie;
}

// function getCookie(name: string) {
//   const nameEQ = name + '=';
//   const ca = document.cookie.split(';');
//   for (let i = 0; i < ca.length; i++) {
//     let c = ca[i];
//     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
//     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
//   }
//   return null;
// }

export { setCookie, getCookie };
