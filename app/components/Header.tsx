'use client'
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';

interface HeaderProps {
  scrollY: number;
}

const Header = ({ scrollY }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsMobileMenuOpen(false);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (isMobileMenuOpen && !target.closest('.mobile-menu-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

 
const navigationItems = [
  { id: 'home', label: 'Home', ariaLabel: 'Go to homepage' },
  { id: 'services', label: 'Digital Marketing', ariaLabel: 'View our digital marketing services' },
  { id: 'local-seo', label: 'Local SEO', ariaLabel: 'Learn about our Lincoln SEO services' },
  { id: 'web-design', label: 'Web Design', ariaLabel: 'View our website design services' },
  { id: 'contact', label: 'Contact', ariaLabel: 'Contact our Lincoln agency' }
];

  return (
    <>
      <header
        role="banner"
        className={`fixed top-0 w-full z-50 transition-all duration-500 mobile-menu-container ${
          scrollY > 100
            ? 'bg-black/95 backdrop-blur-xl border-b border-gray-800 shadow-lg'
            : 'bg-black/90 backdrop-blur-sm border-b border-gray-700'
        }`}
      >
        <nav 
          role="navigation" 
          aria-label="Main navigation"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="flex justify-between items-center h-16 lg:h-20">
            
            {/* Logo/Brand - Simplified */}
            <div className="flex items-center flex-shrink-0">
              <a
                href="#home"
                onClick={(e) => smoothScroll(e, '#home')}
                className="flex items-center space-x-2 sm:space-x-3 group"
                aria-label="Ayubzai Business Solutions - Digital Marketing Agency"
              >
                {/* Logo Image */}
          <div className="relative w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 flex-shrink-0">
                  <Image
                    src="/logo.png"
                    alt="Ayubzai Business Solutions Logo"
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-300"
                    priority
                  />
                </div>
                
             
             
              </a>
            </div>

            {/* Desktop Navigation - Now takes more space */}
            <nav className="hidden md:block flex-1 max-w-2xl mx-8" aria-label="Main menu">
              <ul className="flex items-center justify-center space-x-6 lg:space-x-8 xl:space-x-10">
                {navigationItems.map((item) => (
                  <li key={item.id} className="flex-shrink-0">
                    <a
                      href={`#${item.id}`}
                      onClick={(e) => smoothScroll(e, `#${item.id}`)}
                      className="text-gray-300 hover:text-blue-400 transition-all duration-300 relative group py-2 px-1 font-medium text-sm lg:text-base whitespace-nowrap"
                      aria-label={item.ariaLabel}
                    >
                      {item.label}
                      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300"></span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* CTA Button Only - Removed Phone */}
            <div className="hidden md:flex items-center flex-shrink-0">
              <a
                href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 lg:px-6 py-2 lg:py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-full text-sm lg:text-base shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 group whitespace-nowrap"
                aria-label="Schedule a free consultation"
              >
                <span>Free Consultation</span>
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform duration-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 group transition-all duration-300 ml-3 flex-shrink-0"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`w-6 h-0.5 bg-gray-300 transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>
          </div>

          {/* Mobile Menu */}
          <div
            className={`md:hidden absolute left-0 right-0 transition-all duration-300 ${
              isMobileMenuOpen 
                ? 'opacity-100 visible translate-y-0' 
                : 'opacity-0 invisible -translate-y-4'
            }`}
            style={{ 
              top: '100%',
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgb(229, 231, 235)'
            }}
          >
            <div className="px-4 py-6 space-y-4 max-h-[80vh] overflow-y-auto">
              {/* Mobile Navigation */}
              <nav aria-label="Mobile menu">
                <ul className="space-y-2">
                  {navigationItems.map((item, index) => (
                    <li
                      key={item.id}
                      className={`transform transition-all duration-500 ${
                        isMobileMenuOpen
                          ? 'translate-x-0 opacity-100'
                          : '-translate-x-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${index * 50}ms` }}
                    >
                      <a
                        href={`#${item.id}`}
                        onClick={(e) => smoothScroll(e, `#${item.id}`)}
                        className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 font-medium"
                        aria-label={item.ariaLabel}
                      >
                        {item.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>

              {/* Mobile CTA */}
              <div 
                className={`pt-4 border-t border-gray-200 space-y-3 transform transition-all duration-500 ${
                  isMobileMenuOpen
                    ? 'translate-x-0 opacity-100'
                    : '-translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: '300ms' }}
              >
                {/* Phone for Mobile Only */}
                <a
                  href="tel:+14025551234"
                  className="flex items-center space-x-3 py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300"
                  aria-label="Call us at 402-555-1234"
                >
                  <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <span className="font-medium">(402) 555-1234</span>
                </a>

                {/* CTA Button */}
                <a
                  href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block w-full text-center py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5"
                  aria-label="Schedule a free consultation"
                >
                  Get Free Consultation
                </a>

                {/* Location Badge */}
                <div className="flex items-center justify-center space-x-2 py-3 text-sm text-gray-600 bg-gray-50 rounded-lg">
                  <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <span className="font-medium">Proudly serving Lincoln, NE</span>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
};

export default Header;