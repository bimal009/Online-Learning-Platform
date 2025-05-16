import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useCourses } from '../hooks/useCourses';
import { useCoursesByCategory } from '../hooks/useCoursesByCategory';
import { useCategories } from '../hooks/useCategories';

export const Courses = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const selectedCategory = searchParams.get('category') || '';

    // Call both hooks unconditionally
    const {
        data: allCourses = [],
        isLoading: allCoursesLoading,
    } = useCourses();

    const {
        data: categoryCourses = [],
        isLoading: categoryCoursesLoading,
    } = useCoursesByCategory(selectedCategory);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    // Choose the dataset and loading flag based on whether a category is selected
    const courses = selectedCategory ? categoryCourses : allCourses;
    const coursesLoading = selectedCategory ? categoryCoursesLoading : allCoursesLoading;

    const filteredCourses = Array.isArray(courses) ? courses.filter(
        (course) =>
            course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            course?.description?.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

    const handleCategoryChange = (categoryId) => {
        if (categoryId) {
            setSearchParams({ category: categoryId });
        } else {
            setSearchParams({});
        }
    };

    if (coursesLoading || categoriesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-8 space-y-4 md:space-y-0">
                <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 w-full md:w-auto">
                    <input
                        type="text"
                        placeholder="Search courses..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    />
                    <select
                        value={selectedCategory}
                        onChange={(e) => handleCategoryChange(e.target.value)}
                        className="px-4 py-2 border border-gray-300 rounded-md"
                    >
                        <option value="">All Categories</option>
                        {Array.isArray(categories) && categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(filteredCourses) && filteredCourses.map((course) => (
                    <Link
                        key={course._id}
                        to={`/courses/${course._id}`}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
                    >
                        <div className="aspect-w-16 aspect-h-9">
                            <img
                                src={course.image || 'https://via.placeholder.com/400x225?text=No+Image'}
                                alt={course.title}
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.src = 'https://via.placeholder.com/400x225?text=Invalid+Image';
                                }}
                            />
                        </div>
                        <div className="p-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-2">{course.title}</h2>
                            <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-500">
                                    {Array.isArray(categories) && categories.find((cat) => cat._id === course.category)?.title}
                                </span>
                                <span className="text-blue-600 font-medium">View Course</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>

            {(!filteredCourses || filteredCourses.length === 0) && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-2 text-gray-500">
                        {selectedCategory
                            ? "No courses found in this category"
                            : "No courses available at the moment"}
                    </p>
                </div>
            )}
        </div>
    );
};
