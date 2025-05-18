import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

// Validation schema
const loginSchema = z.object({
    email: z.string().email('Please enter a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters'),
});

const LoginForm = () => {
    const navigate = useNavigate();
    const { login } = useAuth()
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        try {
            const response = await login(data.email, data.password);
            console.log('Form submitted:', response);
            if (response.success) {
                console.log('Login successful:', response);
                toast.success('Login successful!');
                navigate('/');
            } else {
                toast.error(response.message || 'Login failed.');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error('An error occurred during login.');
        }
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
            noValidate
        >
            <div className="space-y-1">
                <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                >
                    Email Address
                </label>
                <input
                    {...register('email')}
                    type="email"
                    id="email"
                    placeholder="you@example.com"
                    className={`w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.email
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 hover:border-purple-300'
                        }`}
                    autoComplete="email"
                />
                {errors.email && (
                    <p className="text-red-600 text-sm mt-1 animate-fadeIn">
                        {errors.email.message}
                    </p>
                )}
            </div>

            <div className="space-y-1">
                <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    {...register('password')}
                    type="password"
                    id="password"
                    placeholder="••••••••"
                    className={`w-full rounded-lg border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 ${errors.password
                        ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                        : 'border-gray-300 hover:border-purple-300'
                        }`}
                    autoComplete="current-password"
                />
                {errors.password && (
                    <p className="text-red-600 text-sm mt-1 animate-fadeIn">
                        {errors.password.message}
                    </p>
                )}
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-lg font-semibold shadow-lg hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed transition-all duration-300"
            >
                {isSubmitting ? (
                    <>
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                            />
                        </svg>
                        Signing in...
                    </>
                ) : (
                    'Sign In'
                )}
            </button>
        </form>
    );
}

export default LoginForm;