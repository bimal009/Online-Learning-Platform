import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'https://blog-1rng.onrender.com/category';

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

export const useCategories = () => {
    const queryClient = useQueryClient();
    const userId = localStorage.getItem('userId');

    const fetchCategories = async () => {
        const response = await api.get('/');
        return response.data;
    };

    const { data, isLoading, error } = useQuery({
        queryKey: ['categories'],
        queryFn: fetchCategories,
    });

    const createCategory = useMutation({
        mutationFn: async (categoryData) => {
            const response = await api.post('/create', {
                ...categoryData,
                userId, // Add userId to the request
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['userCategories', userId] });
        },
    });

    const updateCategory = useMutation({
        mutationFn: async ({ id, categoryData }) => {
            // First check if the category belongs to the user
            const category = data?.find(cat => cat._id === id);
            if (!category || category.userId !== userId) {
                throw new Error('You are not authorized to update this category');
            }
            const response = await api.put(`/${id}`, {
                ...categoryData,
                userId, // Add userId to the request
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['userCategories', userId] });
        },
    });

    const deleteCategory = useMutation({
        mutationFn: async (id) => {
            // First check if the category belongs to the user
            const category = data?.find(cat => cat._id === id);
            if (!category || category.userId !== userId) {
                throw new Error('You are not authorized to delete this category');
            }
            await api.delete(`/${id}`);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['categories'] });
            queryClient.invalidateQueries({ queryKey: ['userCategories', userId] });
        },
    });

    return {
        data,
        isLoading,
        error,
        createCategory,
        updateCategory,
        deleteCategory,
    };
};
export default useCategories;