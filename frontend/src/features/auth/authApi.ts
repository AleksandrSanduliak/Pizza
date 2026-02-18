import { useQueryClient, useMutation, useQuery } from '@tanstack/react-query';

// import { setItems } from '@entities/basket/cartSlice';
import { isAxiosError } from 'axios';

import useUserMenu from '@entities/user-menu/useUserMenu';
import { setUser, logout } from '@features/auth/authSlice';
import { LoginUseRequestData, LoginUserResponseData } from '@features/auth/model/api.interface';
import { AUTH_API_URL } from '@shared/consts/api-list';
import { axiosInstance } from '@shared/consts/axios';
import NotificationFacade from '@shared/funcs/facades/NotificationFacade';
import { useAppDispatch } from '@shared/store/hooks';

export const useRegisterUser = () => {
  const queryClient = useQueryClient();
  const { actions } = useUserMenu();
  return useMutation({
    mutationFn: async (data: any) => {
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
    mutationFn: async (data: LoginUseRequestData) => {
      const response = await axiosInstance.post(`${AUTH_API_URL}/login`, data);
      return response.data;
    },
    onSuccess: (data: LoginUserResponseData) => {
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
      dispatch(logout());
      queryClient.clear();
    },
    onError: (error) => {
      console.log('Logout error:', error);
    },
  });
};

export const refreshRequest = async () => {
  const response = await axiosInstance.get(`${AUTH_API_URL}/refresh`);
  return response.data;
};

export const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ['refreshToken'],
    queryFn: async () => refreshRequest,
    enabled: false,
    retry: false,
    onSuccess: (data: TUserResponse) => {
      if (data) {
        console.log('data', data);
        dispatch(setUser(data));
        // dispatch(setItems(data.userCard));
        queryClient.setQueryData(['user'], data);
      }
    },
  });
};
