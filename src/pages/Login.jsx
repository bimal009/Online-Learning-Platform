import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from '../components/forms/LoginForm';

const LoginPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-50 to-white px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div className="text-center">
                    <h2 className="text-3xl font-bold text-gray-900">Welcome back</h2>
                </div>

                <div className="mt-8 bg-white py-8 px-4 shadow-soft rounded-xl sm:px-10">
                    <LoginForm />
                    <p className="mt-2 text-sm text-gray-600 text-center">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-purple-600 hover:text-purple-500">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage; 