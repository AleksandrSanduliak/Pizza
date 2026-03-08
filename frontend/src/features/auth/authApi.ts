import { useQueryClient, useMutation, useQuery, Register } from '@tanstack/react-query';
import { AxiosResponse, isAxiosError } from 'axios';
// import router from 'next/router';

import { useRouter } from 'next/router';

import { UserData } from '@entities/user/user.schema';
import useUserMenu from '@entities/user-menu/useUserMenu';
import { setUser, logout } from '@features/auth/auth.slice';
import { Login } from '@features/auth/login/login.model';
import { AUTH_API_URL, REFRESH_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';
import { CONFIG } from '@shared/consts/config';
import NotificationFacade from '@shared/funcs/facades/NotificationFacade';
import { useAppDispatch } from '@shared/store/hooks';

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { actions } = useUserMenu();
  return useMutation({
    mutationFn: async (data: Register) => {
      const response = await axiosInstance.post(`${AUTH_API_URL}/register`, data);
      return response.data;
    },
    onSuccess: () => {
      NotificationFacade.toastSuccess({
        message: 'Вы успешно зарегистрировались, войдите в систему.',
      });

      actions.toggleRegister();
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
    onError: (e) => {
      console.log('e', e);

      let message;
      if (isAxiosError(e)) {
        message = e.response?.data.message;
      } else {
        message = 'Произошла ошибка при регистрации, попробуйте позже.';
      }

      NotificationFacade.toastError({
        message: message,
      });
    },
  });
};

export const useLoginUser = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Login) => {
      const response = await axiosInstance.post(`${AUTH_API_URL}/login`, data);
      return response.data;
    },
    onSuccess: (data) => {
      console.log('data', data);
      dispatch(setUser(data));
      // dispatch(setItems(data.userCard)); // TODO
      queryClient.setQueryData(['user'], data);
      NotificationFacade.toastSuccess({
        message: 'Вы зашли в систему',
        options: { closeButton: true },
      });
    },

    onError: (error) => {
      console.log('Login error:', error);
      NotificationFacade.toastError({
        message: 'Ошибка входа, проверьте введенную почту и пароль',
        options: { closeButton: true },
      });
    },
  });
};

export const useLogoutUser = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const response = await axiosInstance.post(`${AUTH_API_URL}/logout`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['user'] });
      queryClient.setQueryData(['user'], undefined);
      dispatch(logout());
    },
    onError: (error) => {
      console.log('Logout error:', error);
      NotificationFacade.toastError({
        message: 'Произошла ошибка при выходе из профиля. Повторите попытку позже',
      });
    },
  });
};

export const refreshRequest = async (cookies: string): Promise<AxiosResponse<UserData>> => {
  try {
    const response = await axiosInstance.get(REFRESH_API_URL, {
      withCredentials: true,
      // headers: {
      //   Cookie: cookies,
      // },
    });
    console.log('REFRESH REQ', response);
    return response.data;
  } catch (error) {
    console.error('Error in refreshRequest:', error);
    throw new Error('Ошибка запроса на обновление токенов');
  }
};

// export const useRefreshToken = () => {
//   const dispatch = useAppDispatch();
//   const queryClient = useQueryClient();

//   return useQuery({
//     queryKey: ['refreshToken'],
//     queryFn: async () => {
//       const response = await axiosInstance.get(`${AUTH_API_URL}/refresh`, {
//         withCredentials: true,
//       });
//       console.log('REFRESH REQ', response);
//       return response.data;
//     },
//     enabled: false,
//     retry: false,
//     onSuccess: (data: TUserResponse) => {
//       if (data) {
//         console.log('data', data);
//         dispatch(setUser(data));
//         // dispatch(setItems(data.userCard));
//         queryClient.setQueryData(['user'], data);
//       }
//     },
//   });
// };
