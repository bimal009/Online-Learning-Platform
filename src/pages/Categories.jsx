import { Link } from 'react-router-dom';
import { useCategories } from '../hooks/useCategories';

export const Categories = () => {
    const { data: categories, isLoading } = useCategories();

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">Course Categories</h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                    Explore our wide range of course categories and find the perfect learning path for you.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories?.map((category) => (
                    <Link
                        key={category._id}
                        to={`/courses?category=${category._id}`}
                        className="group relative bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                                {category.title}
                            </h2>
                            {category.description && (
                                <p className="text-gray-600 mb-4 line-clamp-2">{category.description}</p>
                            )}
                            <div className="flex items-center text-blue-600">
                                <span className="font-medium">Browse Courses</span>
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
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {categories?.length === 0 && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No categories found</h3>
                    <p className="mt-2 text-gray-500">Check back later for new categories</p>
                </div>
            )}
        </div>
    );
};
