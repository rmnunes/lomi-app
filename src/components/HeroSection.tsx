import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Add a small delay for a staggered animation effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="text-center mt-8 sm:mt-16 px-4 sm:px-6 relative overflow-hidden">
      {/* Background glow effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl">
        <div className="w-full h-full bg-lime-500/5 rounded-full blur-[100px] animate-pulse"></div>
      </div>
      
      <div className={`flex justify-center transition-opacity duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: '0ms' }}>
        <Button 
          variant="ghost" 
          className="text-white/80 text-xs sm:text-sm border border-white/20 px-3 sm:px-4 py-1 rounded-full backdrop-blur-md hover:bg-white/10 transition-all hover-lift"
        >
          Explore Live Campaigns <ExternalLink className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4" />
        </Button>
      </div>
      
      <h1 
        className={`text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-4 sm:mt-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '150ms' }}
      >
        Join Hands, Share the Load, <span className="text-lime-400">Create Change</span>
      </h1>
      
      <p 
        className={`text-white/70 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '300ms' }}
      >
        Lomi empowers collective success, harness the power of community to fund your vision, contribute to others, and track progress transparently on the blockchain.
      </p>
      
      <Button 
        className={`mt-6 sm:mt-8 bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-black rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base hover-lift transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
        style={{ transitionDelay: '450ms' }}
      >
        Start Your Campaign <ArrowRight className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4 animate-shimmer" />
      </Button>
    </section>
  );
}
