import React, { useState, useEffect } from 'react';
// import argusLogo from '../assets/images/argusLogo.png';

const StaticHeader = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        backgroundColor: isScrolled ? 'rgba(0, 0, 0, 0.9)' : 'transparent',
        backdropFilter: isScrolled ? 'blur(12px)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(255, 255, 255, 0.1)' : 'none'
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '0 16px' : '0 24px' }}>
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between', 
          height: isMobile ? '70px' : '80px' 
        }}>
          
          {/* Logo - Static (no click functionality) */}
          <div 
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px'
            }}
          >
            <img 
              src="/argusLogo.png" 
              alt="Argus Logo" 
              style={{
                height: isMobile ? '70px' : '90px',
                width: 'auto',
                objectFit: 'contain'
              }}
            />
          </div>

          {/* Desktop Navigation - Static */}
          {!isMobile && (
            <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
              <div
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '500', 
                  fontSize: '1rem',
                  cursor: 'default'
                }}
              >
                Home
              </div>
              
              <div
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '500', 
                  fontSize: '1rem',
                  cursor: 'default'
                }}
              >
                How It Works
              </div>
              
              <div
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '500', 
                  fontSize: '1rem',
                  cursor: 'default'
                }}
              >
                The Future
              </div>
              
              <div
                style={{ 
                  color: 'white', 
                  textDecoration: 'none', 
                  fontWeight: '500', 
                  fontSize: '1rem',
                  cursor: 'default'
                }}
              >
                Contact Us
              </div>
            </nav>
          )}

          {/* Desktop CTA Button - Static */}
          {!isMobile && (
            <div
              style={{
                padding: '12px 24px',
                background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                color: 'white',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'default',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
            >
              Get a Demo
            </div>
          )}

          {/* Mobile Hamburger Menu - Static */}
          {isMobile && (
            <div
              style={{
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px'
              }}
            >
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'white'
              }}></div>
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'white'
              }}></div>
              <div style={{
                width: '24px',
                height: '2px',
                backgroundColor: 'white'
              }}></div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Laptop component that includes the static header
const LaptopWithDynamicScreen = () => {
  return (
    <div className="relative w-full max-w-3xl mx-auto">
      {/* MacBook Air Container with proper aspect ratio */}
      <div className="relative aspect-[16/10]">
        {/* Laptop Image */}
        <img 
          src="/laptop4.png" 
          alt="MacBook Air 13 inch showing web development animation"
          className="w-full h-full object-contain pointer-events-none select-none"
        />
        
        {/* Dynamic Screen Overlay - positioned for MacBook Air 13" screen */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute overflow-hidden rounded-lg shadow-2xl pointer-events-none"
            style={{
              left: '28%',     
              top: '11%',     
              width: '44.7%',    
              height: '55.7%',   
              // MacBook Air screen angle
              transform: 'perspective(1200px) rotateX(2deg) rotateY(4deg) rotateZ(-1.8deg)',
              transformOrigin: 'center bottom',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Screen bezel effect */}
            <div className="absolute inset-0 bg-black rounded-lg pointer-events-none"></div>
            
            {/* Inner screen container */}
            <div 
              className="w-full h-full relative overflow-hidden rounded-md pointer-events-none"
              style={{
                margin: '2px',
                width: 'calc(100% - 4px)',
                height: 'calc(100% - 4px)'
              }}
            >
              {/* Static Header displayed in the laptop screen */}
              <div className="relative w-full h-full pointer-events-none">
                <StaticHeader />
                
                {/* Content below header */}
                <div className="pt-20 px-4 h-full flex flex-col justify-center items-center pointer-events-none select-none">
                  <div className="text-center">
                    <div className="text-white text-sm md:text-lg lg:text-xl font-bold mb-1 opacity-90 drop-shadow-lg pointer-events-none select-none">
                      Web Development
                    </div>
                    <div className="text-blue-300 text-xs md:text-sm lg:text-base opacity-70 drop-shadow-md pointer-events-none select-none">
                      MacBook Air Optimized
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Subtle screen reflection effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent pointer-events-none"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LaptopWithDynamicScreen;