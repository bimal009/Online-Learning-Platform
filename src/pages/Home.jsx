import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import CallToAction from '../components/CallToAction';
import Testimonials from '../components/Testimonials';

export const Home = () => {
    return (
        <div className="min-h-screen">


            <Hero />
            <CallToAction />
            <Features />
            <HowItWorks />
            <Testimonials />

        </div>
    );
}; 