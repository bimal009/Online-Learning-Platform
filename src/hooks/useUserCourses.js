import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/mycourse';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
});

export const useUserCourses = (userId) => {
    return useQuery({
        queryKey: ['userCourses', userId],
        queryFn: async () => {
            if (!userId) return [];
            const response = await api.get(`/${userId}`);
            return response.data;
        },
        enabled: !!userId, // Only run if userId exists
    });
};

export default useUserCourses; 