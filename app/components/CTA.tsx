'use client'
import { useState, useRef, useEffect } from 'react';

// Enhanced AnimateOnScroll Component (you'll need to import this if it's in a separate file)
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

const CTA = ({ onCategoryChange }: { onCategoryChange?: (category: string) => void }) => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Services', count: 9 },
    { id: 'seo', label: 'SEO & Marketing', count: 4 },
    { id: 'development', label: 'Web Development', count: 3 },
    { id: 'branding', label: 'Branding & Design', count: 2 }
  ];

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    if (onCategoryChange) {
      onCategoryChange(categoryId);
    }
  };

  return (
    <section 
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white"
      aria-label="Digital Marketing Services Header and Filters"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-purple-50/20 to-pink-50/30"></div>
      
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M40 40c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16 sm:mb-20">
          <AnimateOnScroll>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
              Complete Digital Marketing Services
            </div>
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={100}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              <span className="block">Lincoln's Most Comprehensive</span>
              <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                Digital Marketing Services
              </span>
            </h2>
          </AnimateOnScroll>
          
          <AnimateOnScroll delay={200}>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed mb-8">
              From <strong>local SEO</strong> and <strong>website development</strong> to <strong>brand design</strong> and <strong>marketing automation</strong> — 
              we're your one-stop digital marketing agency in <strong>Lincoln, Nebraska</strong>.
            </p>
          </AnimateOnScroll>

          {/* Service Categories Filter - Fixed Layout */}
          <AnimateOnScroll delay={300}>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 max-w-5xl mx-auto">
              {/* Desktop Layout - All buttons in one row */}
              <div className="hidden sm:flex flex-wrap justify-center gap-3 sm:gap-4 w-full">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`flex-shrink-0 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border-2 whitespace-nowrap ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {category.label}
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile Layout - Stacked buttons */}
              <div className="flex sm:hidden flex-col gap-3 w-full max-w-xs">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => handleCategoryChange(category.id)}
                    className={`w-full px-6 py-3 rounded-full font-semibold text-base transition-all duration-300 border-2 ${
                      activeCategory === category.id
                        ? 'bg-blue-600 text-white border-blue-600 shadow-lg'
                        : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:text-blue-600'
                    }`}
                  >
                    {category.label}
                    <span className="ml-2 text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      {category.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </AnimateOnScroll>
        </div>

        {/* Bottom CTA Section */}
        <AnimateOnScroll delay={600}>
          <div className="mt-20 text-center">
            <div className="bg-gradient-to-r from-gray-900 to-blue-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-16.569-13.431-30-30-30v30h30z'/%3E%3C/g%3E%3C/svg%3E")`,
                }}></div>
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 leading-tight">
                  Need a Custom Digital Marketing Strategy?
                </h3>
                <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Every Lincoln business is unique. Let's create a custom digital marketing plan that fits your specific goals, 
                  budget, and timeline. Free consultation, no obligations.
                </p>
                
                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
                  <a
                    href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-gray-900 font-bold rounded-full text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 group"
                  >
                    <span>Schedule Free Strategy Call</span>
                    <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </a>
                  
                  <a
                    href="tel:+14025551234"
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white font-bold rounded-full text-lg hover:bg-white hover:text-gray-900 transition-all duration-300"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                    </svg>
                    <span>Call (402) 555-1234</span>
                  </a>
                </div>
                
          
           
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default CTA;