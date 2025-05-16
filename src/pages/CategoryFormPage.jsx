import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import CategoryForm from '../components/forms/CategoryForm';

export const CategoryFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { data: categories, isLoading } = useCategories();
    const category = categories?.find(cat => cat._id === id);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <button
                    onClick={() => navigate(-1)}
                    className="text-indigo-600 hover:text-indigo-800 flex items-center"
                >
                    <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 19l-7-7m0 0l7-7m-7 7h18"
                        />
                    </svg>
                    Back
                </button>
            </div>
            <CategoryForm category={category} mode={id ? 'update' : 'create'} />
        </div>
    );
}; 