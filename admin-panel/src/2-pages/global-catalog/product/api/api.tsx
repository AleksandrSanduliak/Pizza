import apiUrl from '@shared/consts/api-consts';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useGetGlobalProduct({ category, id }: { category: string; id: number }) {
  return useQuery({
    queryKey: ['globalProduct', category, id],
    queryFn: async (): Promise<Array<any>> => {
      const response = await axios.get(`${apiUrl.getGlobalProduct}/${category}/${id}`);
      return response.data;
    },
  });
}
