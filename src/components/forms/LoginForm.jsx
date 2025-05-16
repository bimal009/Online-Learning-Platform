import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

// Validation schema
const loginSchema = z.object({

    email: z.string().email('Please enter a valid email address'),
    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
    ,
});

export default function LoginForm() {
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
                navigate('/');
            }
        } catch (error) {
            console.error('Login error:', error);
        }
    };

    return (
        <div className="flex items-center justify-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white bg-opacity-90 backdrop-blur-md rounded-xl  max-w-md w-full p-8 space-y-6"
                noValidate
            >
                <h2 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
                    Welcome Back
                </h2>

                <div className="space-y-1">
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700"
                    >
                        Email Address
                    </label>
                    <input
                        {...register('email')}
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        className={`w-full rounded-md border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.email
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300'
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
                        className="block text-sm font-semibold text-gray-700"
                    >
                        Password
                    </label>
                    <input
                        {...register('password')}
                        type="password"
                        id="password"
                        placeholder="••••••••"
                        className={`w-full rounded-md border px-4 py-3 shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition ${errors.password
                            ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                            : 'border-gray-300'
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
                    className="w-full flex justify-center items-center gap-2 py-3 rounded-md bg-indigo-600 text-white text-lg font-semibold shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed transition"
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
        </div>
    );
}
