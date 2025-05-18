import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCategories } from '../../hooks/useCategories';
import { useNavigate } from 'react-router-dom';

// Validation schema
const categorySchema = z.object({
    title: z.string().min(2, 'Name must be at least 2 characters'),
    description: z.string().min(10, 'Description must be at least 10 characters'),
});

export default function CategoryForm({ category, mode = 'create' }) {
    const navigate = useNavigate();
    const { createCategory, updateCategory } = useCategories();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(categorySchema),
        defaultValues: category || {
            name: '',
            description: '',
        },
    });

    const onSubmit = async (data) => {
        try {
            if (mode === 'create') {
                await createCategory.mutateAsync(data);
            } else {
                await updateCategory.mutateAsync({ id: category._id, categoryData: data });
            }
            navigate('/categories');
        } catch (error) {
            console.error('Form submission error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl max-w-md w-full p-8 space-y-6"
                noValidate
            >
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                    {mode === 'create' ? 'Create New Category' : 'Update Category'}
                </h2>

                <div className="space-y-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category Name
                    </label>
                    <input
                        {...register('title')}
                        type="text"
                        id="title"
                        className={`w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.name
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 hover:border-purple-300'
                            }`}
                    />
                    {errors.title && (
                        <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>
                    )}
                </div>

                <div className="space-y-1">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        {...register('description')}
                        id="description"
                        rows="4"
                        className={`w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.description
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300 hover:border-purple-300'
                            }`}
                    />
                    {errors.description && (
                        <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
                >
                    {isSubmitting ? (
                        <>
                            <svg
                                className="animate-spin h-5 w-5 text-white"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                            >
                                <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                />
                                <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8v8H4z"
                                />
                            </svg>
                            {mode === 'create' ? 'Creating...' : 'Updating...'}
                        </>
                    ) : (
                        mode === 'create' ? 'Create Category' : 'Update Category'
                    )}
                </button>
            </form>
        </div>
    );
} 