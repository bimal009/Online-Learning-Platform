import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useRef, useEffect } from 'react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const userId = localStorage.getItem('userId');
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex">
                        <Link to="/" className="flex items-center">
                            <span className="text-2xl font-bold text-blue-600">EduLearn</span>
                        </Link>
                        <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                            <Link
                                to="/courses"
                                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                Courses
                            </Link>
                            <Link
                                to="/categories"
                                className="inline-flex items-center px-1 pt-1 text-gray-500 hover:text-blue-600 transition-colors"
                            >
                                Categories
                            </Link>
                            {/* >>>>> */}
                            {/* Remove This After Following me */}
                            <Link
                                target='_blank'
                                to="https://github.com/bimal009"
                                className="  inline-flex items-center font-bold px-1 space-x-3 gap-3 pt-1 text-blue-600 hover:text-blue-600 transition-colors"
                            >
                                Kindly Follow Bimal Pandey In Github And Change The Theme Of the Website <p className='text-2xl text-red-600'>Click To Follow</p>
                            </Link>
                            {/* >>>>> */}

                        </div>
                    </div>
                    <div className="flex items-center">
                        {user ? (
                            <div className="relative" ref={dropdownRef}>
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 focus:outline-none"
                                >
                                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                                        {userData.name ? userData.name[0].toUpperCase() : 'U'}
                                    </div>
                                    <span className="hidden md:block">{userData.name || 'User'}</span>
                                    <svg
                                        className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
                                        <div className="py-1" role="menu" aria-orientation="vertical">

                                            <button
                                                onClick={() => {
                                                    logout();
                                                    setIsDropdownOpen(false);
                                                }}
                                                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                                role="menuitem"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-4">
                                <Link
                                    to="/auth"
                                    className="px-4 py-2 rounded-md text-blue-600 hover:bg-blue-50 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/auth"
                                    className="px-4 py-2 rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}; 