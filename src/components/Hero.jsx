import { Link } from "react-router-dom"

// change to your relevant hero image
const Hero = () => {
    return (
        <section className="relative overflow-hidden">
            {/* Hero Content */}
            <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
                <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
                    {/* Text Content */}
                    <div className="w-full lg:w-1/2 space-y-6 text-center lg:text-left">
                        <div className="space-y-2">
                            <p className="inline-block text-sm font-medium bg-primary/10 text-primary px-4 py-1.5 rounded-full">
                                Learn at your own pace
                            </p>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                                Empower your <span className="text-primary">mind</span> with <span className="text-primary">knowledge</span>
                            </h1>
                        </div>

                        <p className="text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0">
                            Access thousands of expert-led courses anytime, anywhere — start building skills that boost your career and passion.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                            <button size="lg" variant="outline" className="rounded-full px-8 bg-primary text-white">
                                <Link to="/courses">Get Started</Link>
                            </button>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-4 pt-6 border-t border-border/60">
                            <div>
                                <p className="text-2xl font-bold">1,200+</p>
                                <p className="text-sm text-muted-foreground">Courses</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">25k+</p>
                                <p className="text-sm text-muted-foreground">Students</p>
                            </div>
                            <div>
                                <p className="text-2xl font-bold">500+</p>
                                <p className="text-sm text-muted-foreground">Instructors</p>
                            </div>
                        </div>
                    </div>

                    {/* Hero Image */}
                    <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                        <div className="relative w-full max-w-md lg:max-w-none">
                            <div className="aspect-square md:aspect-[4/3] relative">
                                <img
                                    src="./hero.jpg" // change to your relevant hero image
                                    alt="Students learning online"
                                    className="object-contain drop-shadow-xl"
                                />
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 rounded-full bg-primary/10 blur-3xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero
