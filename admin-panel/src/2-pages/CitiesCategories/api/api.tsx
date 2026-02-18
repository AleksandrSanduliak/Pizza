// import apiUrl from '@shared/consts/api-consts';
import { CityItem } from '@/5-shared/interface/city-interface';
import apiUrl from '@shared/consts/api-consts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { CityFormFields } from '../ui/CititesCategories';

export const useGetCitiesListQuery = () => {
  return useQuery({
    queryKey: ['citiesList'],
    queryFn: async (): Promise<Array<any>> => {
      const response = await axios.get(apiUrl.getCitiesList);
      return response.data;
    },
  });
};

export function useCreateCityMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CityFormFields) => {
      console.log('data', data);
      return await axios.post(apiUrl.createCity, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['citiesList'] });
    },
    onError: (err: Error) => console.log('ERROR RECEIVED:', err.message),
  });
}

export function useCreateLocalCategoryMutation(city: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { city: string; category: string }) => {
      console.log('data', data);
      return axios.post(apiUrl.createLocalCategory, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [city] });
    },
  });
}

export function useCreateLocalProduct(city?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data) => {
      console.log('data', data);
      return axios.post(apiUrl.createLocalProduct, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [city] });
    },
  });
}

export function useDeleteLocalProductMutation(city?: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: { productId: number; category: string; cityId: number }) => {
      console.log('data', data);
      return axios.delete(apiUrl.deleteLocalProduct, { data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [city] });
    },
  });
}

export function useGetCityQuery(city: string) {
  return useQuery({
    queryKey: [city],
    queryFn: async (): Promise<CityItem | null> => {
      const response = await axios.get(`${apiUrl.getCity}/${city}`);
      if ('data' in response) return response.data;
      return null;
    },
  });
}
