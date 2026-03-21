import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import apiUrl from '../consts/api-consts';
import { CategoryForm } from '@/2-pages/global-catalog/global-categories/ui/create-category-form';
import { useToaster } from '@/5-shared/ui/components/toast';
import { MainProductItem } from '@/5-shared/interface/global-product-interface';
import {
  GetGlobalCategory,
  GetGlobalCategorySchema,
} from '@/5-shared/api/schemas/get-global-category.schema';

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
    queryFn: async (): Promise<GetGlobalCategory> => {
      const response = await axios.get(`${apiUrl.getCategory}/${category}`);
      const validate = GetGlobalCategorySchema.safeParse(response.data);
      if (!validate.success) throw Error(validate.error.toString());
      return validate.data;
    },
    enabled,
  });
}

export function useCreateCategoryMutation() {
  const queryClient = useQueryClient();
  const { showToast } = useToaster();
  return useMutation({
    mutationFn: async (data: CategoryForm) => {
      return axios.post(apiUrl.createCategory, data);
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['globalCategories'] });
      console.log('data');
      showToast(`Категория ${data.categoryTitle} успешно создана`, 'success');
    },
    onError: (error, variables, context) => {
      let message: string = '';
      if (axios.isAxiosError(error)) {
        if (error.response) {
          message = error.response.data.message;
        }
      } else {
        message =
          'Произошла ошибка создания глобальной категории. Пожалуйста обратитесь к администратору.';
      }

      console.log('error, variables, context', error, variables, context);
      showToast(`Категория ${message} успешно создана`, 'error');
    },
  });
}
