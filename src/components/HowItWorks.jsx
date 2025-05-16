import React from 'react';
import { Search, BookOpen, Video, Star } from 'lucide-react';

const HowItWorks = () => {
    const steps = [
        {
            icon: <Search className="h-12 w-12 text-black" />,
            title: "Explore Courses",
            description: "Browse through a wide variety of expert-led courses tailored to your interests."
        },
        {
            icon: <BookOpen className="h-12 w-12 text-black" />,
            title: "Enroll",
            description: "Sign up easily and get instant access to your chosen course materials."
        },
        {
            icon: <Video className="h-12 w-12 text-black" />,
            title: "Learn",
            description: "Watch video lessons, complete assignments, and interact with instructors."
        },
        {
            icon: <Star className="h-12 w-12 text-black" />,
            title: "Achieve",
            description: "Earn certificates and showcase your new skills to the world."
        }
    ];

    return (
        <div className="text-center  mb-12 mx-auto px-4 py-16 md:py-24 lg:px-30">
            <p className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">
                Simple Process
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">How Learnly Works</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Unlock your potential in just a few easy steps
            </p>

            <div className="relative">
                {/* Connector Line */}
                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-primary/20 z-0"></div>

                {/* Steps */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
                    {steps.map((step, index) => (
                        <div key={index} className="flex flex-col items-center text-center">
                            <div className="bg-primary p-4 rounded-full mb-4 border-4 border-white shadow-md">
                                {step.icon}
                            </div>
                            <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                            <p className="text-muted-foreground">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;
