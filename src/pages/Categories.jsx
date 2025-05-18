import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';
import toast from 'react-hot-toast';

export const Categories = () => {
    const { data: categories, isLoading, deleteCategory } = useCategories();

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory.mutateAsync(categoryId);
                toast.success('Category deleted successfully!');
            } catch (error) {
                console.error('Error deleting category:', error);
                toast.error('Failed to delete category.');
            }
        }
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Course Categories</h1>
                    <p className="mt-2 text-gray-600">Organize your courses into categories</p>
                </div>
                <Link
                    to="/categories/new"
                    className="inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-md font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Category
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                    <div
                        key={category._id}
                        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <h2 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
                                    {category.title}
                                </h2>
                            </div>
                            {category.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                                <Link
                                    to={`/courses?category=${category._id}`}
                                    className="inline-flex items-center text-purple-600 hover:text-purple-800 transition-colors duration-200"
                                >
                                    <span>Browse Courses</span>
                                    <svg
                                        className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </Link>
                            </div>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-4">
                                <Link
                                    to={`/categories/edit/${category._id}`}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(category._id)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors duration-200"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!categories || categories.length === 0) && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
                    <p className="mt-2 text-gray-500">Start by creating your first category</p>
                    <Link
                        to="/categories/new"
                        className="mt-4 inline-flex items-center px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-md font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-300"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Your First Category
                    </Link>
                </div>
            )}
        </div>
    );
};
