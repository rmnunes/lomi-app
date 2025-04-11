import Navbar from "./components/NavBar";
import HeroSection from "./components/HeroSection";
import FeaturesSection from "./components/FeaturesSection";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0c0c1d] to-[#0a0a17]">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
    </div>
  );
}
