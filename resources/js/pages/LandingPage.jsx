import { Link } from "react-router-dom";

import Hero from "../components/LandingPage/Hero";
import Features from "../components/LandingPage/Features";
import About from "../components/LandingPage/About";
import Footer from "../components/LandingPage/Footer";
import Navbar from "../components/LandingPage/Navbar";

export default function LandingPage() {
    return (
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 min-h-screen text-white flex flex-col">
            <Navbar />
            <Hero />
            <Features />
            <About />
            <Footer />
        </div>
    );
}
