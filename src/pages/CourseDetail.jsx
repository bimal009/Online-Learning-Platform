import { useParams, Link } from 'react-router-dom';
import { useCourseById } from '../hooks/useCourseById';
import { useCategories } from '../hooks/useCategories';

export const CourseDetail = () => {
    const { id } = useParams();
    const { data: course, isLoading: courseLoading } = useCourseById(id);
    const { data: categories, isLoading: categoriesLoading } = useCategories();

    if (courseLoading || categoriesLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!course) {
        return (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
                <h2 className="text-2xl font-bold text-gray-900">Course not found</h2>
                <p className="mt-2 text-gray-600">The course you're looking for doesn't exist or has been removed.</p>
                <Link
                    to="/courses"
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                >
                    Back to Courses
                </Link>
            </div>
        );
    }

    const category = categories?.find((cat) => cat._id === course.category);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="aspect-w-16 aspect-h-9">
                    <img
                        src={course.image || 'https://via.placeholder.com/1200x675?text=No+Image'}
                        alt={course.title}
                        className="w-full h-96 object-cover"
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/1200x675?text=Invalid+Image';
                        }}
                    />
                </div>
                <div className="p-6 sm:p-8">
                    <div className="flex items-center justify-between mb-6">
                        <h1 className="text-3xl font-bold text-gray-900">{course.title}</h1>
                        {category && (
                            <Link
                                to={`/courses?category=${category._id}`}
                                className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800 hover:bg-blue-200"
                            >
                                {category.name}
                            </Link>
                        )}
                    </div>

                    <p className="text-gray-600 text-lg mb-6">{course.description}</p>

                    {course.instructor && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Instructor</h2>
                            <p className="text-gray-600">{course.instructor}</p>
                        </div>
                    )}

                    {course.duration && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Duration</h2>
                            <p className="text-gray-600">{course.duration}</p>
                        </div>
                    )}

                    {course.prerequisites?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Prerequisites</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                {course.prerequisites.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {course.learningObjectives?.length > 0 && (
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold mb-2">Learning Objectives</h2>
                            <ul className="list-disc list-inside text-gray-600">
                                {course.learningObjectives.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="mt-8 flex justify-end">
                        <Link
                            to="/courses"
                            className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                        >
                            Back to Courses
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
