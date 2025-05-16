import { Link } from 'react-router-dom';
import { useUserCourses } from '../hooks/useUserCourses';
import { useCourses } from '../hooks/useCourses';
import { useCategories } from '../hooks/useCategories';

export const MyCourses = () => {
    const userId = localStorage.getItem('userId');
    const { data: courses = [], isLoading: coursesLoading } = useUserCourses(userId);
    const { deleteCourse } = useCourses();
    const { data: categories = [] } = useCategories();

    const handleDelete = async (courseId) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await deleteCourse.mutateAsync(courseId);
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    if (coursesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                <Link
                    to="/courses/new"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                    Add New Course
                </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses?.map((course) => (
                    <div
                        key={course._id}
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
                                    {categories?.find((cat) => cat._id === course.category)?.title}
                                </span>
                                <div className="flex space-x-4">
                                    <Link
                                        to={`/courses/edit/${course._id}`}
                                        className="text-blue-600 hover:text-blue-800"
                                    >
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(course._id)}
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

            {(!courses || courses.length === 0) && (
                <div className="text-center py-12">
                    <h3 className="text-lg font-medium text-gray-900">No courses found</h3>
                    <p className="mt-2 text-gray-500">Start by creating your first course</p>
                </div>
            )}
        </div>
    );
}; 