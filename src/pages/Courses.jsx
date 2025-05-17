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
        deleteCourse,
    } = useCourses();

    const {
        data: categoryCourses = [],
        isLoading: categoryCoursesLoading,
    } = useCoursesByCategory(selectedCategory);

    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    // Choose the dataset and loading flag based on whether a category is selected
    const courses = selectedCategory ? categoryCourses : allCourses;
    const coursesLoading = selectedCategory ? categoryCoursesLoading : allCoursesLoading;

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse.mutateAsync(courseId);
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

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
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Courses</h1>
                    <p className="mt-2 text-gray-600">Explore and manage your courses</p>
                </div>
                <Link
                    to="/courses/new"
                    className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    Add New Course
                </Link>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4 mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <input
                            type="text"
                            placeholder="Search courses..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                    </div>
                    <div className="w-full md:w-64">
                        <select
                            value={selectedCategory}
                            onChange={(e) => handleCategoryChange(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.isArray(filteredCourses) && filteredCourses.map((course) => (
                    <div
                        key={course._id}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
                    >
                        <div className="relative">
                            <Link to={`/courses/${course._id}`}>
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
                            </Link>
                        </div>
                        <div className="p-6">
                            <Link to={`/courses/${course._id}`} className="block">
                                <h2 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                                    {course.title}
                                </h2>
                                <p className="text-gray-600 mb-4 line-clamp-2">{course.description}</p>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-gray-500">
                                        {Array.isArray(categories) && categories.find((cat) => cat._id === course.category)?.title}
                                    </span>
                                    <span className="text-blue-600 font-medium flex items-center">
                                        View Course
                                        <svg className="w-5 h-5 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </span>
                                </div>
                            </Link>
                            <div className="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-4">
                                <Link
                                    to={`/courses/edit/${course._id}`}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-md transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                                    </svg>
                                    Edit
                                </Link>
                                <button
                                    onClick={() => handleDelete(course._id)}
                                    className="inline-flex items-center px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-md transition-colors"
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

            {(!filteredCourses || filteredCourses.length === 0) && (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                    <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-2 text-gray-500">
                        {selectedCategory
                            ? "No courses found in this category"
                            : "No courses available at the moment"}
                    </p>
                    <Link
                        to="/courses/new"
                        className="mt-4 inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        Create Your First Course
                    </Link>
                </div>
            )}
        </div>
    );
};
