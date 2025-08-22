'use client'
import { useEffect, useState, useRef } from 'react';
import Mission from '@/app/components/Mission';

// Enhanced AnimateOnScroll Component (unchanged)
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

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const categories = [
    { id: 'all', label: 'All Services', count: 9 },
    { id: 'seo', label: 'SEO & Marketing', count: 4 },
    { id: 'development', label: 'Web Development', count: 3 },
    { id: 'branding', label: 'Branding & Design', count: 2 }
  ];

  const services = [
    {
      category: 'seo',
      icon: '🚀',
      title: 'Local SEO Services Lincoln',
      subtitle: 'Dominate Google Maps & Local Search',
      description: 'Get your Lincoln business found by customers ready to buy. Our proven local SEO strategies help you outrank competitors in Google Maps, local search results, and voice search queries.',
      features: [
        'Google Business Profile optimization',
        'Local citation building & NAP consistency',
        'Local keyword targeting & content',
        'Review management & reputation building',
        'Local link building campaigns'
      ],
      highlight: '#1 Local SEO',
      gradient: 'from-green-500 to-emerald-400'
    },
    {
      category: 'development',
      icon: '💻',
      title: 'Custom Website Design & Development',
      subtitle: 'Mobile-Responsive Sites That Convert',
      description: 'Professional websites built with modern frameworks that turn visitors into customers. Fast-loading, mobile-optimized, and designed specifically for Lincoln businesses.',
      features: [
        'Custom responsive web design',
        'E-commerce website development',
        'Content management systems (CMS)',
        'Website speed optimization',
        'Mobile-first development approach'
      ],
      highlight: 'Convert More',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      category: 'seo',
      title: 'Search Engine Optimization (SEO)',
      subtitle: 'Rank Higher on Google Nationwide',
      icon: '📈',
      description: 'Data-driven SEO strategies that get your business found online. From keyword research to technical SEO, we help Lincoln businesses compete nationally.',
      features: [
        'Comprehensive SEO audits',
        'Keyword research & strategy',
        'On-page & technical SEO',
        'Content optimization',
        'Monthly performance reporting'
      ],
      highlight: 'Real Results',
      gradient: 'from-purple-500 to-pink-400'
    },
    {
      category: 'seo',
      icon: '📧',
      title: 'Email Marketing Automation',
      subtitle: 'Nurture Leads While You Sleep',
      description: 'Automated email sequences that convert prospects into loyal customers. Professional email campaigns, list building, and marketing automation for Lincoln businesses.',
      features: [
        'Email campaign design & setup',
        'Marketing automation workflows',
        'List building & lead magnets',
        'A/B testing & optimization',
        'Email deliverability management'
      ],
      highlight: 'Work Smarter',
      gradient: 'from-teal-500 to-green-400'
    },
    {
      category: 'branding',
      icon: '🎨',
      title: 'Logo Design & Brand Identity',
      subtitle: 'Stand Out From Your Competition',
      description: 'Professional logo design, brand guidelines, and visual identity that makes your Lincoln business memorable. Complete branding packages for startups and established companies.',
      features: [
        'Custom logo design concepts',
        'Brand guideline development',
        'Business card & stationery design',
        'Social media branding',
        'Brand strategy consultation'
      ],
      highlight: 'Stand Out',
      gradient: 'from-indigo-500 to-purple-400'
    },
    {
      category: 'development',
      icon: '⚙️',
      title: 'CRM Setup & Technical Infrastructure',
      subtitle: 'Streamline Your Business Operations',
      description: 'Professional CRM integration, email system setup, DMARC configuration, and technical infrastructure that works seamlessly from day one.',
      features: [
        'CRM system setup & integration',
        'Professional email configuration',
        'DMARC, SPF & DKIM setup',
        'Business automation workflows',
        'Technical support & maintenance'
      ],
      highlight: 'No Hassle',
      gradient: 'from-orange-500 to-red-400'
    },
    {
      category: 'seo',
      icon: '📱',
      title: 'Social Media Marketing',
      subtitle: 'Engage Your Audience Where They Are',
      description: 'Strategic social media campaigns that build brand awareness and drive traffic to your Lincoln business. Content creation, community management, and paid social advertising.',
      features: [
        'Social media strategy development',
        'Content creation & scheduling',
        'Community management',
        'Paid social media advertising',
        'Social media analytics & reporting'
      ],
      highlight: 'Get Noticed',
      gradient: 'from-pink-500 to-rose-400'
    },
    {
      category: 'branding',
      icon: '📸',
      title: 'Professional Photography',
      subtitle: 'Showcase Your Business Professionally',
      description: 'High-quality business photography for your website, marketing materials, and social media. Product photography, headshots, and location shoots in Lincoln and surrounding areas.',
      features: [
        'Business & product photography',
        'Professional headshots',
        'Location & lifestyle shoots',
        'Photo editing & retouching',
        'Usage rights & licensing'
      ],
      highlight: 'Look Professional',
      gradient: 'from-yellow-500 to-orange-400'
    },
    {
      category: 'development',
      icon: '🛒',
      title: 'E-commerce Development',
      subtitle: 'Sell Online & Grow Your Revenue',
      description: 'Custom e-commerce websites that drive sales. From Shopify to custom solutions, we build online stores that convert visitors into customers for Lincoln businesses.',
      features: [
        'E-commerce platform setup',
        'Payment gateway integration',
        'Inventory management systems',
        'Shopping cart optimization',
        'E-commerce SEO & marketing'
      ],
      highlight: 'Sell More',
      gradient: 'from-emerald-500 to-teal-400'
    }
  ];

  const filteredServices = activeCategory === 'all' 
    ? services 
    : services.filter(service => service.category === activeCategory);

  return (
    <section 
      id="services" 
      className="py-20 sm:py-28 lg:py-32 px-4 sm:px-6 relative overflow-hidden bg-white"
      aria-label="Digital Marketing Services in Lincoln Nebraska"
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
        {/* Mission moved to its own component */}
        <Mission AnimateOnScroll={AnimateOnScroll} />

        {/* Service Categories Filter – single row */}
        <AnimateOnScroll delay={300}>
          <div className="w-full flex justify-center">
            <div className="inline-flex flex-nowrap gap-3 sm:gap-4 max-w-full overflow-x-auto sm:overflow-visible px-1">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`whitespace-nowrap px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all duration-300 border-2 ${
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

        {/* Services Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
          {filteredServices.map((service, index) => (
            <AnimateOnScroll key={`${service.title}-${activeCategory}`} delay={index * 100}>
              <div className="group relative h-full">
                {/* Service Card */}
                <div className="relative bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 hover:border-gray-200 transform hover:-translate-y-3 h-full flex flex-col">
                  
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6">
                    {/* Icon */}
                    <div className={`w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-r ${service.gradient} rounded-2xl flex items-center justify-center text-2xl sm:text-3xl shadow-lg transform group-hover:rotate-12 transition-transform duration-300`}>
                      {service.icon}
                    </div>

                    {/* Highlight Badge */}
                    <div className={`px-3 py-1 bg-gradient-to-r ${service.gradient} text-white text-xs font-bold rounded-full shadow-md transform group-hover:scale-110 transition-transform duration-300 whitespace-nowrap`}>
                      {service.highlight}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-300 leading-tight">
                      {service.title}
                    </h3>
                    
                    <h4 className="text-sm sm:text-base text-blue-600 font-semibold mb-4">
                      {service.subtitle}
                    </h4>
                    
                    <p className="text-gray-600 leading-relaxed text-base mb-6 flex-1">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="mb-6">
                      <h5 className="text-sm font-semibold text-gray-900 mb-3">What's Included:</h5>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-gray-600">
                            <svg className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Value Proposition */}
                    <div className="mb-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
                      <div className="text-center">
                        <div className="text-sm font-semibold text-gray-700 mb-1">Custom Investment Based On:</div>
                        <div className="text-xs text-gray-600">Your Goals • Scope • Timeline</div>
                      </div>
                    </div>

                    {/* CTA Button */}
                    <a
                      href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-full inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r ${service.gradient} text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group/btn`}
                    >
                      <span>Get Custom Quote</span>
                      <svg className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </a>
                  </div>

                  {/* Hover Gradient Border */}
                  <div className={`absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 pointer-events-none`}></div>
                </div>
              </div>
            </AnimateOnScroll>
          ))}
        </div>

        {/* Bottom CTA Section (unchanged) */}
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
                
                {/* Trust Indicators */}
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center text-blue-200">
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-white mb-1">100+</div>
                    <div className="text-sm">Projects Completed</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-white mb-1">50+</div>
                    <div className="text-sm">Lincoln Clients</div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="text-2xl font-bold text-white mb-1">300%</div>
                    <div className="text-sm">Avg ROI Increase</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </AnimateOnScroll>
      </div>
    </section>
  );
};

export default Services;
