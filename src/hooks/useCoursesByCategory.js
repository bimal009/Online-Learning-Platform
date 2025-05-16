import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/mycourse';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_URL,
});

// Add request interceptor to add auth token
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const useCoursesByCategory = (categoryId) => {
    return useQuery({
        queryKey: ['coursesByCategory', categoryId],
        queryFn: async () => {
            if (!categoryId) return [];
            const response = await api.get(`/category/${categoryId}`);
            return response.data;
        },
        enabled: !!categoryId, // Only run if categoryId exists
    });
};

export default useCoursesByCategory;