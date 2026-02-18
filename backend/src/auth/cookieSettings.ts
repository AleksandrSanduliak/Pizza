import { CookieOptions } from 'express';

export const cookieSettings: CookieOptions = {
  maxAge: 1000 * 60 * 60 * 24 * 30,
  httpOnly: true,
  sameSite: 'strict',
  secure: true,
};
