import Feature from "./Feature";
import { useEffect, useState, useRef } from "react";

export default function FeaturesSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the section is 20% visible, trigger animations
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section ref={sectionRef} className="mt-16 sm:mt-24 px-4 sm:px-6 max-w-5xl mx-auto relative">
      {/* Background accent */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-lime-500/10 rounded-full blur-[80px]"></div>
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-lime-500/10 rounded-full blur-[80px]"></div>
      
      <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Key Features of <span className="text-lime-400">Lomi</span></h2>
        <p className="text-white/70 mb-6 sm:mb-10 text-sm sm:text-base">
          Lomi offers a powerful platform to bring your projects to life with ease. Discover the core features designed to support your campaign from start to finish.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '100ms' }}>
          <Feature
            icon={<span className="material-icons text-xl mt-1 sm:text-2xl">monitor_heart</span>}
            title="Transparent Tracking"
            description="Monitor your campaign's progress with real-time updates and blockchain transparency, ensuring full visibility and accountability."
          />
        </div>
        
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '200ms' }}>
          <Feature
            icon={<span className="material-icons text-xl mt-1 sm:text-2xl">attach_money</span>}
            title="Secure Transactions"
            description="Enjoy secure and seamless financial transactions, thanks to blockchain technology that protects your funds and personal information."
          />
        </div>
        
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '300ms' }}>
          <Feature
            icon={<span className="material-icons text-xl mt-1 sm:text-2xl">support_agent</span>}
            title="Comprehensive Support"
            description="Access extensive resources and support throughout your campaign, ensuring you have the tools and guidance needed for success."
          />
        </div>
        
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '400ms' }}>
          <Feature
            icon={<span className="material-icons text-xl mt-1 sm:text-2xl">groups</span>}
            title="Community Engagement"
            description="Build and engage with a community of backers who are passionate about your project, fostering collaboration and support."
          />
        </div>
      </div>
    </section>
  );
}
