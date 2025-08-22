'use client'
import { useEffect, useState, useRef } from 'react';

// Enhanced AnimateOnScroll Component
const AnimateOnScroll = ({
  children,
  threshold = 0.2,
  animationClass = 'animate-fade-in-up',
  delay = 0
}: {
  children: React.ReactNode;
  threshold?: number;
  animationClass?: string;
  delay?: number;
}) => {
  const domRef = useRef(null);
  const [isVisible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => setVisible(true), delay);
          }
        });
      },
      { threshold }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, delay]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ${
        isVisible ? animationClass : 'opacity-0 translate-y-12'
      }`}
    >
      {children}
    </div>
  );
};

const Hero = () => {
  const [currentText, setCurrentText] = useState(0);
  const rotatingTexts = [
    "Digital Experiences That Drive Growth",
    "Local SEO That Gets You Found",
    "Websites That Actually Convert"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentText((prev) => (prev + 1) % rotatingTexts.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col items-center justify-center text-center px-4 sm:px-6 pt-20 sm:pt-32 relative hero-section"
      aria-label="Digital Marketing Agency Hero Section"
    >
      {/* Background Elements - Now using CSS classes instead of inline styles */}
      <div className="hero-background-gradient"></div>
      
      {/* Animated Background Pattern - Now using CSS classes */}
      <div className="hero-background-pattern"></div>

      <div className="hero-content max-w-7xl w-full flex flex-col items-center space-y-6 sm:space-y-8 relative z-10">
        
        {/* Main Headline with Rotating Text */}
           <AnimateOnScroll delay={100}>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-center">
            <span className="block hero-main-heading mb-2 sm:mb-4">We Build</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent min-h-[1.2em] transition-all duration-500">
              {rotatingTexts[currentText]}
            </span>
          </h1>
        </AnimateOnScroll>

        {/* Value Proposition */}
    <AnimateOnScroll delay={200}>
          <div className="max-w-4xl mx-auto">
            <p className="text-lg sm:text-xl lg:text-2xl hero-value-prop leading-relaxed font-medium mb-4">
              <span className="font-bold hero-highlight-blue"></span>Helping ambitious businesses 
              <span className="font-bold hero-highlight-purple"> dominate local search</span> and 
              <span className="font-bold hero-highlight-pink"> scale nationwide</span>.
            </p>
            <p className="text-base sm:text-lg hero-description max-w-3xl mx-auto">
              From custom web development to strategic SEO campaigns — we deliver measurable results, not empty promises.
            </p>
          </div>
        </AnimateOnScroll>

        {/* Service Badges - Optimized for Mobile */}
        <AnimateOnScroll delay={300}>
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-3 sm:gap-4 mt-6 w-full max-w-4xl">
            <div className="service-badge service-badge-blue">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              <span className="whitespace-nowrap">Web Development</span>
            </div>
            
            <div className="service-badge service-badge-green">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">SEO Services</span>
            </div>
            
            <div className="service-badge service-badge-purple">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Brand Strategy</span>
            </div>
            
            <div className="service-badge service-badge-orange">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="whitespace-nowrap">Mobile App Development</span>
            </div>
          </div>
        </AnimateOnScroll>

        {/* Call to Action */}
        <AnimateOnScroll delay={500}>
          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row gap-4 items-center w-full max-w-lg mx-auto">
            <a
              href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hero-cta-button"
              aria-label="Book free strategy session"
            >
              <span>Get Your Free Strategy Session</span>
              <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </div>
        </AnimateOnScroll>

        {/* Location & Service Area */}
         <AnimateOnScroll delay={600}>
          <div className="text-center mt-6">
            <p className="text-sm sm:text-base hero-location-text font-medium">
              <span className="hero-location-highlight font-bold">📍 Lincoln, Nebraska</span> • 
              <span className="ml-1">Serving businesses nationwide</span>
            </p>
            
          </div>
        </AnimateOnScroll>
      </div>

      {/* Scroll Indicator */}
      <AnimateOnScroll delay={700}>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </AnimateOnScroll>
    </section>
  );
};

export default Hero;