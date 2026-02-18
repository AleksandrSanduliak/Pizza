import apiUrl from '@shared/consts/api-consts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { GlobalProduct } from '../interface/global-product-interface';

export const getGlobalProducts = async () => {
  const response = await axios.get(apiUrl.getGlobalProducts);
  return response.data;
};

export function useCreateGlobalProduct({ queryKey }: { queryKey: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: GlobalProduct): Promise<Array<GlobalProduct>> => {
      return axios.post(apiUrl.createGlobalProduct, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
export function useUpdateGlobalProductMutation({ queryKeys }: { queryKeys: string[] }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data): Promise<Array<any>> => {
      return axios.post(apiUrl.updateGlobalProduct, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys });
    },
  });
}

export function useGetGlobalProducts() {
  return useQuery({
    queryKey: ['globalProducts'],
    queryFn: async (): Promise<Array<any>> => {
      const response = await axios.get(apiUrl.getGlobalProducts);
      return response.data;
    },
  });
}

export function useDeleteGlobalProducts({ queryKey }: { queryKey: string }) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: { id: number; category: string }) => {
      return axios.delete(apiUrl.deleteGlobalProduct, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey] });
    },
  });
}
