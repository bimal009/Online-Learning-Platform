import React from 'react';
import { Link } from 'react-router-dom';


const CallToAction = () => {
    return (
        <div className="text-center mb-12 mt-24">
            <div className="bg-primary/5 rounded-2xl p-8 md:p-12">
                <p className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">
                    Ready to Learn?
                </p>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Start Your Learning Journey Today</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                    Join thousands of learners mastering new skills with our expert-led courses.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="rounded-full px-6 py-2 bg-primary text-black bg-gray-100 shadow-sm hover:bg-gray-200">
                        <Link to="/courses">Enroll Now</Link>
                    </button>
                    <button className="rounded-full px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white">
                        <Link to="/courses">Browse Courses</Link>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CallToAction;
