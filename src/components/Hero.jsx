import { Link } from "react-router-dom"

// change to your relevant hero image
const Hero = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-purple-50 to-white">
            {/* Hero Content */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        <div className="space-y-2">
                            <p className="inline-block text-sm font-medium bg-purple-100 text-purple-700 px-4 py-1.5 rounded-full">
                                Learn at your own pace
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
                                Empower your <span className="text-purple-600">mind</span> with <span className="text-indigo-600">knowledge</span>
                            </h1>
                        </div>

                        <p className="text-lg text-gray-600 max-w-xl mx-auto lg:mx-0">
                            Access thousands of expert-led courses anytime, anywhere — start building skills that boost your career and passion.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button className="rounded-full px-8 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:from-purple-700 hover:to-indigo-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                                <Link to="/courses">Get Started</Link>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                            <div>
                                <p className="text-2xl font-bold text-gray-900">1,200+</p>
                                <p className="text-sm text-gray-600">Courses</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">25k+</p>
                                <p className="text-sm text-gray-600">Students</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-gray-900">500+</p>
                                <p className="text-sm text-gray-600">Instructors</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-none">
                            <div className="aspect-square md:aspect-[4/3] relative">
                                <img
                                    src="./hero.png" // change to your relevant hero image
                                    alt="Students learning online"
                                    className="object-contain drop-shadow-2xl rounded-2xl"
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-gradient-to-r from-purple-200/50 to-indigo-200/50 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
