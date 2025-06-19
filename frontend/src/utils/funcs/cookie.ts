'use client';

import { expriesOptions } from 'utils/consts/cookie';

// export async function setCookie(
//   name: string,
//   value: string,
//   expiresValue: number,
//   expiresType = 'days',
// ) {
//   let expires = '';
//   const date = new Date();

//   if (expiresType === 'days') date.setTime(date.getTime() + expiresValue * expriesOptions.day);

//   if (expiresType === 'minutes')
//     date.setTime(date.getTime() + expiresValue * expriesOptions.minutes);

//   expires = '; expires=' + date.toUTCString();
//   // console.log('document.cookie', document.cookie);
//   document.cookie = name + '=' + (value || '') + expires + '; path=/';
//   // console.log('document.cookie', document.cookie, value, name);
// }

export function getCookie(name: string) {
  'use client';
  if (typeof document === 'undefined') return;
  const nameEQ = name + '=';
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

export function eraseCookie(name: string) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}
