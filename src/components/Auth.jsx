import React, { useState } from 'react';
import LoginForm from './forms/LoginForm';
import RegisterForm from './forms/RegisterForm';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen flex items-center justify-center   px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">


                <div className="mt-8 bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {isLogin ? <LoginForm /> : <RegisterForm />}
                    <div>

                        <p className="mt-2 text-center text-sm text-gray-600 mt-2">
                            {isLogin ? (
                                <>
                                    Or{' '}
                                    <button
                                        onClick={() => setIsLogin(false)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        create a new account
                                    </button>
                                </>
                            ) : (
                                <>
                                    Already have an account?{' '}
                                    <button
                                        onClick={() => setIsLogin(true)}
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                    >
                                        Sign in
                                    </button>
                                </>
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
} 