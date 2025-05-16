import { Link } from 'react-router-dom';
import { useUserCategories } from '../hooks/useUserCategories';
import { useCategories } from '../hooks/useCategories';

export const MyCategories = () => {
    const userId = localStorage.getItem('userId');
    const { data: categories, isLoading: categoriesLoading } = useUserCategories(userId);
    const { deleteCategory } = useCategories();

    const handleDelete = async (categoryId) => {
        if (window.confirm('Are you sure you want to delete this category?')) {
            try {
                await deleteCategory.mutateAsync(categoryId);
            } catch (error) {
                console.error('Error deleting category:', error);
            }
        }
    };

    if (categoriesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Categories</h1>
                <Link
                    to="/categories/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Category
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                    <div
                        key={category._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{category.title}</h2>
                            {category.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                            )}
                            <div className="flex items-center justify-between">
                                <Link
                                    to={`/courses?category=${category._id}`}
                                    className="text-blue-600 hover:text-blue-800"
                                >
                                    View Courses
                                </Link>
                                <div className="flex space-x-4">
                                    <Link
                                        to={`/categories/edit/${category._id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(category._id)}
                                        className="text-red-600 hover:text-red-800"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {(!categories || categories.length === 0) && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
                    <p className="mt-2 text-gray-500">Start by creating your first category</p>
                </div>
            )}
        </div>
    );
}; 