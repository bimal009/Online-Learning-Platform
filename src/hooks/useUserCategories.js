import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/category';

export const useUserCategories = (userId) => {
  return useQuery({
    queryKey: ['userCategories', userId],
    queryFn: async () => {
      const response = await axios.get(`${API_URL}/user/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

export default useUserCategories; 