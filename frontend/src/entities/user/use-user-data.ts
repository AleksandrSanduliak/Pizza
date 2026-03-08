import { useQuery } from '@tanstack/react-query';

import { UserData } from '@entities/user/user.schema';
import { REFRESH_API_URL } from '@shared/api/api-list';
import { axiosInstance } from '@shared/api/axios';

export const useUserData = () => {
  return useQuery({
    queryKey: ['userdata'],
    queryFn: async (): Promise<UserData | undefined> => {
      const response = await axiosInstance.get(REFRESH_API_URL, {
        withCredentials: true,
      });
      console.log('use user response', response);
      return response.data;
    },
    retry: false,
  });
};
