import React from 'react';
import { Star } from 'lucide-react';

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Johnson",
            location: "New York",
            image: "/api/placeholder/64/64",
            content: "This platform transformed how I learn. The courses are engaging and the instructors are top-notch!",
            rating: 5
        },
        {
            name: "David Chen",
            location: "San Francisco",
            image: "/api/placeholder/64/64",
            content: "Flexible learning at my own pace helped me balance work and study. Highly recommend the platform.",
            rating: 5
        },
        {
            name: "Maria Rodriguez",
            location: "Chicago",
            image: "/api/placeholder/64/64",
            content: "Wide variety of courses and excellent support. I’ve gained skills that boosted my career.",
            rating: 4
        }
    ];

    return (
        <div className="text-center  mb-12 mx-auto px-4 py-16 md:py-24 lg:px-30">
            <p className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full mb-4">
                Student Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">What Our Students Say</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
                Real stories from learners who achieved their goals with us
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-border/20">
                        <div className="flex items-center mb-4">
                            <div className="relative w-12 h-12 mr-4">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="rounded-full object-cover"
                                />
                            </div>
                            <div className="text-left">
                                <h3 className="font-semibold">{testimonial.name}</h3>
                                <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                            </div>
                        </div>

                        <div className="flex mb-3">
                            {[...Array(5)].map((_, i) => (
                                <Star
                                    key={i}
                                    className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
                                />
                            ))}
                        </div>

                        <p className="text-muted-foreground text-left">"{testimonial.content}"</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Testimonials;
