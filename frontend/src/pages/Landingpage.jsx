import CoreFeatures from "../components/CoreFeatures";
import Navbar from "../components/Navbar"
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import FinalCTA from "../components/FinalCTA";
import Footer from "../components/Footer";
import About from "../components/About";

function LandingPage() {
  return (
    <main>
    <Navbar/>
    <Hero />
    <HowItWorks />
    <CoreFeatures />
    <About/>
    <FinalCTA />
    <Footer />
    </main>
  );
}

export default LandingPage;