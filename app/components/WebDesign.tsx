import React, { useEffect, useState, useRef } from 'react';
import LaptopWithDynamicScreen from '../design/LaptopScreen';
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
  const domRef = useRef<HTMLDivElement | null>(null);
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
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
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

// Main Web Development Component
const WebDesignSection = () => {
  return (
    <section 
      id="services" 
     className="py-16 md:py-24 text-white"
      aria-label="Ayubzai Business Solutions - Web Development Services"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Web Development Section - Text Content Only */}
        <div className="mb-16 sm:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            
            {/* Left Side - Content */}
            <AnimateOnScroll delay={0}>
              <div className="order-2 lg:order-1">
                <div className="mb-6">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white mb-4 leading-tight">
                    Web Development 
                  </h2>
                  <h3 className="text-xl sm:text-2xl text-blue-400 font-semibold mb-6">
                    Custom Websites Built for Lincoln Businesses
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  <p className="text-lg text-gray-300 leading-relaxed">
                    We build <span className="text-blue-400 font-semibold">lightning-fast</span>, 
                    <span className="text-green-400 font-semibold"> mobile-responsive</span> websites 
                    that convert visitors into customers. Every site is optimized for 
                    <span className="text-purple-400 font-semibold"> speed</span>, 
                    <span className="text-yellow-400 font-semibold"> local SEO</span>, and 
                    <span className="text-pink-400 font-semibold"> user experience</span>.
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">React & Next.js</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">90+ PageSpeed Score</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">Lincoln SEO Optimized</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                      <span className="text-gray-300">Mobile-First Design</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl"
                  >
                    <span>Start Your Project</span>
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  <a
                    href="#portfolio"
                    className="inline-flex items-center justify-center px-6 py-3 border-2 border-blue-500 text-blue-400 font-semibold rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
                  >
                    View Our Work
                  </a>
                </div>
              </div>
            </AnimateOnScroll>

            {/* Right Side - Empty space where laptop was */}
            <AnimateOnScroll delay={200}>
              <div className="order-1 lg:order-2">
             
                 <LaptopWithDynamicScreen /> 
              </div>
            </AnimateOnScroll>
          </div>
        </div>

        {/* SEO Optimized Content Section */}
        <AnimateOnScroll delay={400}>
          <div className="bg-black/20 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-blue-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Why Choose Ayubzai Business Solutions in Lincoln, Nebraska?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🎯</div>
                <h4 className="text-lg font-semibold text-blue-400 mb-2">Local SEO Experts</h4>
                <p className="text-gray-300 text-sm">Dominate Lincoln search results and attract local customers</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-lg font-semibold text-green-400 mb-2">Lightning Fast</h4>
                <p className="text-gray-300 text-sm">Optimized for speed and performance that Google loves</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">📱</div>
                <h4 className="text-lg font-semibold text-purple-400 mb-2">Mobile-First</h4>
                <p className="text-gray-300 text-sm">Responsive designs that work perfectly on all devices</p>
              </div>
            </div>
          </div>
        </AnimateOnScroll>

      </div>
      
      <style jsx>{`
        .animate-fade-in-up {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  );
};

export default WebDesignSection;