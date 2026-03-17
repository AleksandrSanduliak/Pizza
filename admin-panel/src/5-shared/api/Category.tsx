import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import apiUrl from '../consts/api-consts';
import { Category, CategoryTitles } from '../interface/category-interface';
import { CategoryForm } from '@/2-pages/Categories/ui/create-category-form';

export function useGetGlobalCategoriesQuery() {
  return useQuery({
    queryKey: ['globalCategories'],
    queryFn: async (): Promise<{ categories: Category[]; totalCount: number }> => {
      const response = await axios.get(apiUrl.getGlobalCategories);
      console.log('response', response);
      console.log('response');
      const totalCount = response?.headers?.['x-total-count'];
      return { categories: response.data || [], totalCount: Number(totalCount) ?? 0 };
    },
  });
}

export function useGetGlobalCategoryQuery({
  category,
  enabled = true,
}: {
  category: string;
  enabled?: boolean;
}) {
  return useQuery({
    queryKey: [category],
    queryFn: async (): Promise<Category> => {
      const response = await axios.get(`${apiUrl.getCategory}/${category}`);
      return response.data;
    },
    enabled,
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: CategoryForm) => {
      return axios.post(apiUrl.createCategory, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['globalCategories'] });
    },
  });
}
