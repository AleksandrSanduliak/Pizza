import { cookies } from 'next/headers';

import { userDataSchema } from '@entities/user/user.schema';
import { refreshRequest } from '@features/auth/authApi';

export const getUserData = async () => {
  const cookieStorie = cookies();
  const accessToken = (await cookieStorie).get('accessToken')?.value;

  if (!accessToken) return;
  const allCookies = (await cookies()).toString();

  const refresh = await refreshRequest(allCookies);
  if (!refresh) return;

  const validate = userDataSchema.safeParse(refresh);
  if (!validate.success) return;
  return validate.data;
};
