import { ArrowRight, ExternalLink } from "lucide-react";
import { Button } from "./ui/button";

export default function HeroSection() {
  return (
    <section className="text-center mt-8 sm:mt-16 px-4 sm:px-6">
      <div className="flex justify-center">
        <Button variant="ghost" className="text-white/80 text-xs sm:text-sm border px-3 sm:px-4 py-1 rounded-full backdrop-blur-md">
          Explore Live Campaigns <ExternalLink className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4" />
        </Button>
      </div>
      <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-white mt-4 sm:mt-6">Join Hands, Share the Load, Create Change</h1>
      <p className="text-white/70 mt-3 sm:mt-4 text-sm sm:text-base max-w-2xl mx-auto">
        Lomi empowers collective success, harness the power of community to fund your vision, contribute to others, and track progress transparently on the blockchain.
      </p>
      <Button className="mt-6 sm:mt-8 bg-gradient-to-r from-lime-500 to-lime-400 hover:from-lime-400 hover:to-lime-300 text-black rounded-full px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base">
        Start Your Campaign <ArrowRight className="ml-1 sm:ml-2 w-3 sm:w-4 h-3 sm:h-4" />
      </Button>
    </section>
  );
}
