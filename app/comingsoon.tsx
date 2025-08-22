import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import Head from 'next/head';

const ComingSoonPage = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [time, setTime] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>(0);
  const timeRef = useRef<number>(0);

  // Memoized particle counts based on device capabilities
  const particleCounts = useMemo(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const isTablet = typeof window !== 'undefined' && window.innerWidth >= 768 && window.innerWidth < 1024;
    
    return {
      quantum: isMobile ? 15 : isTablet ? 25 : 35,
      neural: isMobile ? 8 : isTablet ? 15 : 20,
      dataStreams: isMobile ? 3 : isTablet ? 6 : 8,
      rifts: isMobile ? 2 : isTablet ? 4 : 5
    };
  }, []);

  // Optimized particle creation with object pooling concept
  const createOptimizedParticle = useCallback((type: string, index: number) => {
    const particle = document.createElement('div');
    particle.className = `${type}-particle`;
    particle.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      transform: translate3d(0,0,0);
      will-change: transform, opacity;
    `;
    
    if (type === 'quantum') {
      const quantumState = index % 4;
      particle.setAttribute('data-quantum', quantumState.toString());
    } else if (type === 'neural') {
      particle.style.cssText += `
        transform: rotate(${Math.random() * 360}deg) translate3d(0,0,0);
        animation-delay: ${Math.random() * 3}s;
      `;
    } else if (type === 'dimensional') {
      particle.style.cssText += `animation-delay: ${Math.random() * 8}s;`;
    }
    
    return particle;
  }, []);

  // Throttled mouse handler for better performance
  const throttledMouseMove = useCallback(
    (() => {
      let lastCall = 0;
      return (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastCall >= 16) { // ~60fps
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            setMousePosition({
              x: ((e.clientX - rect.left) / rect.width) * 100,
              y: ((e.clientY - rect.top) / rect.height) * 100
            });
          }
          lastCall = now;
        }
      };
    })(),
    []
  );

  // Optimized scroll handler with throttling
  const throttledScrollHandler = useCallback(
    (() => {
      let ticking = false;
      return () => {
        if (!ticking) {
          requestAnimationFrame(() => {
            setScrollY(window.scrollY);
            ticking = false;
          });
          ticking = true;
        }
      };
    })(),
    []
  );

  // Intersection Observer for visibility optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Optimized animation loop
  useEffect(() => {
    const animate = () => {
      if (isVisible) {
        timeRef.current += 0.016; // ~60fps increment
        setTime(timeRef.current);
      }
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Optimized particle generation with reduced DOM manipulation
  useEffect(() => {
    if (!isVisible) return;

    const fragment = document.createDocumentFragment();
    const containers = {
      quantum: document.getElementById('quantum-field'),
      neural: document.getElementById('neural-network'),
      dataStreams: document.getElementById('data-streams'),
      rifts: document.getElementById('dimensional-rifts')
    };

    // Generate particles more efficiently
    Object.entries(particleCounts).forEach(([type, count]) => {
      const container = containers[type as keyof typeof containers];
      if (container && container.children.length === 0) {
        for (let i = 0; i < count; i++) {
          const particle = createOptimizedParticle(
            type === 'dataStreams' ? 'data' : type === 'rifts' ? 'dimensional' : type,
            i
          );
          fragment.appendChild(particle);
        }
        container.appendChild(fragment.cloneNode(true));
      }
    });

    // Event listeners with passive options for better performance
    const handleMouseMove = throttledMouseMove;
    const handleScroll = throttledScrollHandler;

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isVisible, particleCounts, createOptimizedParticle, throttledMouseMove, throttledScrollHandler]);

  // Memoized background style for performance
  const backgroundStyle = useMemo(() => ({
    background: `
      conic-gradient(from ${time * 8}deg at 50% 50%, 
        #000000 0deg, #0a0a0a 60deg, #1a1a1a 120deg, 
        #000000 180deg, #0f0f0f 240deg, #000000 300deg, #000000 360deg),
      radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, 
        hsla(${180 + Math.sin(time) * 30}, 70%, 25%, 0.06) 0%, transparent 50%)
    `
  }), [time, mousePosition.x, mousePosition.y]);

  return (
    <>
      <Head>
        <title>Coming Soon - Ayubzai Business Solutions</title>
        <meta name="description" content="Ayubzai Business Solutions - Digital marketing and custom development services launching soon. Schedule your free consultation today!" />
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/logo.png" as="image" />
        <link rel="dns-prefetch" href="//calendly.com" />
        <link rel="preconnect" href="https://calendly.com" />
        
        {/* Performance and SEO meta tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Ayubzai Business Solutions" />
        <meta property="og:title" content="Coming Soon - Ayubzai Business Solutions" />
        <meta property="og:description" content="Your complete digital partner for digital marketing, custom web development, and mobile app development." />
        <meta property="og:type" content="website" />
        
        {/* Critical CSS inlined for better performance */}
        <style>{`
          * {
            box-sizing: border-box;
          }
          body {
            margin: 0;
            padding: 0;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: #000;
            overflow-x: hidden;
          }
          img {
            max-width: 100%;
            height: auto;
          }
        `}</style>
      </Head>

      {/* OPTIMIZED QUANTUM DIMENSIONAL EXPERIENCE */}
      <div 
        ref={containerRef}
        className="quantum-container"
        style={backgroundStyle}
      >
        {/* Optimized particle containers with better z-indexing */}
        <div id="quantum-field" className="particle-layer" style={{ zIndex: 1 }} />
        <div id="neural-network" className="particle-layer" style={{ zIndex: 2 }} />
        <div id="data-streams" className="particle-layer" style={{ zIndex: 3 }} />
        <div id="dimensional-rifts" className="particle-layer" style={{ zIndex: 4 }} />

        {/* Optimized grid with CSS variables */}
        <div className="spacetime-grid" style={{ ['--grid-opacity' as any]: isVisible ? 0.15 : 0 }} />

        {/* Simplified holographic UI for better performance */}
        {isVisible && (
          <div className="holographic-ui-container">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="holographic-ui"
                style={{
                  ['--delay' as any]: i,
                  ['--offset' as any]: i * 15
                }}
              />
            ))}
          </div>
        )}

        {/* Optimized portal with CSS transforms */}
        <div 
          className="interdimensional-portal"
          style={{
            ['--mouse-x' as any]: `${mousePosition.x}%`,
            ['--mouse-y' as any]: `${mousePosition.y}%`,
            ['--time' as any]: time
          }}
        >
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="portal-layer"
              style={{ ['--layer' as any]: i }}
            />
          ))}
        </div>

        {/* Main content with improved layout */}
        <main className="main-content">
          
          {/* Optimized logo section */}
           
          {/* Logo with Static Design */}
          <div className="mb-8 animate-fade-in-up">
            <div 
              className="quantum-logo-container w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full flex items-center justify-center transition-all duration-1000 hover:scale-110"
            >
              <div 
                className="quantum-field-distortion"
              />
    <div className="quantum-rings">
  {[...Array(5)].map((_, i) => (
    <div
      key={i}
      className="quantum-ring"
 style={{
  ...({ '--ring-delay': i } as React.CSSProperties),
  animationDelay: `${i * 0.2}s`
}}
    />
  ))}
</div>       <img 
                src="/logo.png"
                alt="Ayubzai Business Solutions Logo" 
                className="w-full h-full object-contain relative z-10"
              />
            </div>
          </div>

          {/* Improved typography hierarchy */}
          <div className="content-wrapper">
            <h1 className="company-name">
              Ayubzai Business Solutions
            </h1>

            <div className="slogan-section">
              <div className="tagline-wrapper">
                <p className="main-tagline">
                   Solving complex problems, one strategic solution at a time.
                </p>
            
              </div>
              
              {/* Services Tabs */}
              <div className="services-tabs">
                <div className="service-tab">
                  <span>Custom Web Development</span>
                </div>
                <div className="service-tab">
                  <span>Digital Marketing</span>
                </div>
                <div className="service-tab">
                  <span>Mobile App Development</span>
                </div>
                <div className="service-tab">
                  <span>Brand/Logo Design</span>
                </div>
                
                <div className="service-tab">
                  <span>Custom Solutions</span>
                </div>
              </div>
            </div>

            <div className="coming-soon-section">
              <h2 className="coming-soon-title">Coming Soon!</h2>
              <p className="coming-soon-description">
                Big changes ahead! We're redesigning our entire digital presence.
                <br />
                Our new platform launches soon!
              </p>
            </div>

            {/* Optimized CTA button */}
            <div className="cta-section">
              <a
                href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="quantum-cta-button"
                aria-label="Schedule a free 30-minute consultation"
              >
                <span>Schedule Free Consultation</span>
                <svg className="cta-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </main>
      </div>

      {/* OPTIMIZED CSS WITH PERFORMANCE IMPROVEMENTS */}
      <style jsx>{`
        .quantum-container {
          min-height: 100vh;
          min-height: 100dvh; /* Dynamic viewport height for mobile */
          position: relative;
          overflow: hidden;
          transform: translateZ(0); /* Force hardware acceleration */
          will-change: background;
        }

        .particle-layer {
          position: absolute;
          inset: 0;
          pointer-events: none;
          contain: layout style paint;
        }

        /* Optimized animations with better performance */
        @keyframes quantumFluctuation {
          0%, 100% { 
            transform: translate3d(0, 0, 0) scale(1);
            opacity: 0.4;
          }
          50% { 
            transform: translate3d(10px, 15px, 0) scale(1.1);
            opacity: 0.8;
          }
        }

        @keyframes neuralPulse {
          0%, 100% { 
            opacity: 0.2;
            transform: scaleX(1) translateZ(0);
          }
          50% { 
            opacity: 0.6;
            transform: scaleX(1.3) translateZ(0);
          }
        }

        @keyframes dataFlow {
          from { 
            transform: translateY(100vh) translateZ(0);
            opacity: 0;
          }
          10%, 90% { opacity: 0.5; }
          to { 
            transform: translateY(-20vh) translateZ(0);
            opacity: 0;
          }
        }

        @keyframes dimensionalShift {
          0%, 100% { 
            transform: rotate(0deg) scale(1) translateZ(0);
            opacity: 0.3;
          }
          50% { 
            transform: rotate(180deg) scale(1.2) translateZ(0);
            opacity: 0.6;
          }
        }

        @keyframes fadeInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px) translateZ(0); 
          }
          to { 
            opacity: 1; 
            transform: translateY(0) translateZ(0); 
          }
        }

        /* Optimized particle styles */
        .quantum-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          will-change: transform, opacity;
          animation: quantumFluctuation 4s infinite ease-in-out;
          backface-visibility: hidden;
        }

        .quantum-particle[data-quantum="0"] {
          background: hsl(180, 70%, 60%);
          box-shadow: 0 0 8px hsl(180, 70%, 50%);
        }

        .quantum-particle[data-quantum="1"] {
          background: hsl(240, 70%, 60%);
          box-shadow: 0 0 8px hsl(240, 70%, 50%);
        }

        .quantum-particle[data-quantum="2"] {
          background: hsl(300, 70%, 60%);
          box-shadow: 0 0 8px hsl(300, 70%, 50%);
        }

        .quantum-particle[data-quantum="3"] {
          background: hsl(120, 70%, 60%);
          box-shadow: 0 0 8px hsl(120, 70%, 50%);
        }

        .neural-particle {
          position: absolute;
          width: 80px;
          height: 1px;
          background: linear-gradient(90deg, transparent, hsla(200, 70%, 50%, 0.4), transparent);
          animation: neuralPulse 3s infinite ease-in-out;
          will-change: transform, opacity;
        }

        .data-particle {
          position: absolute;
          font-family: 'Courier New', monospace;
          font-size: 6px;
          color: hsla(160, 70%, 50%, 0.5);
          animation: dataFlow 10s infinite linear;
          will-change: transform, opacity;
        }

        .dimensional-particle {
          position: absolute;
          width: 40px;
          height: 40px;
          background: conic-gradient(from 0deg, hsla(280, 70%, 40%, 0.3), transparent);
          border-radius: 50%;
          animation: dimensionalShift 6s infinite ease-in-out;
          filter: blur(2px);
          will-change: transform, opacity;
        }

        .spacetime-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(100, 255, 255, var(--grid-opacity)) 3px, transparent 1px),
            linear-gradient(90deg, rgba(100, 255, 255, var(--grid-opacity)) 1px, transparent 1px);
          background-size: 40px 40px;
          opacity: var(--grid-opacity, 0.5);
          transition: opacity 0.3s ease;
          contain: strict;
        }

        .holographic-ui-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 5;
        }

        .holographic-ui {
          position: absolute;
          width: clamp(30px, 5vw, 50px);
          height: clamp(30px, 5vw, 50px);
          border: 1px solid hsla(200, 70%, 50%, 0.3);
          background: hsla(200, 70%, 50%, 0.03);
          left: calc(17% + var(--offset, 0) * 1%);
          top: calc(20% + sin(var(--time, 0) + var(--delay, 0)) * 20px);
          transform: rotate(calc(var(--time, 0) * 5deg + var(--delay, 0) * 30deg)) translateZ(0);
         opacity: calc(0.6 + sin(var(--time, 0) + var(--delay, 0)) * 0.3);
          clip-path: polygon(20% 0%, 80% 0%, 100% 20%, 100% 80%, 80% 100%, 20% 100%, 0% 80%, 0% 20%);
          will-change: transform, opacity;
        }

        .interdimensional-portal {
          position: absolute;
          width: clamp(60px, 8vw, 100px);
          height: clamp(60px, 8vw, 100px);
          left: var(--mouse-x, 50%);
          top: var(--mouse-y, 50%);
          transform: translate(-50%, -50%) rotate(calc(var(--time, 0) * 20deg)) translateZ(0);
          pointer-events: none;
          z-index: 6;
          will-change: transform;
        }

        .portal-layer {
          position: absolute;
          inset: 0;
          border: 1px solid hsla(260, 70%, 50%, calc(0.4 - var(--layer, 0) * 0.1));
          border-radius: 50%;
          background: radial-gradient(circle, hsla(260, 70%, 50%, 0.05), transparent);
          transform: scale(calc(1 - var(--layer, 0) * 0.15)) translateZ(0);
          will-change: transform;
        }

        .main-content {
          position: relative;
          z-index: 10;
          min-height: 100vh;
          min-height: 100dvh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: clamp(1rem, 4vw, 2rem);
          contain: layout;
        }

        .logo-section {
          margin-bottom: clamp(2rem, 4vw, 3rem);
          animation: fadeInUp 1s ease-out forwards;
        }

        .quantum-logo-container {
          position: relative;
          width: clamp(120px, 20vw, 192px);
          height: clamp(120px, 20vw, 192px);
          border-radius: 50%;
          background: hsla(200, 70%, 10%, 0.3);
          backdrop-filter: blur(10px);
          border: 2px solid hsla(200, 70%, 50%, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease;
          will-change: transform;
        }

        .quantum-logo-container:hover {
          transform: scale(1.05) translateZ(0);
        }

        .quantum-field-distortion {
          position: absolute;
          inset: -15px;
          background: conic-gradient(from 0deg, hsla(180, 70%, 50%, 0.15), hsla(240, 70%, 50%, 0.2), hsla(300, 70%, 50%, 0.15));
          border-radius: 50%;
          filter: blur(10px);
          will-change: transform;
        }

        .quantum-rings {
          position: absolute;
          inset: 0;
        }

.quantum-ring {
  position: absolute;
  inset: calc(-5px * (var(--ring-delay, 0) + 1));
  border: 1px solid hsla(200, 70%, 50%, calc(0.2 - var(--ring-delay, 0) * 0.05));
  border-radius: 50%;
  animation: quantumFluctuation calc(3s + var(--ring-delay, 0) * 1s) infinite ease-in-out;
  animation-delay: calc(var(--ring-delay, 0) * 0.5s);

  left: -10%;
  top: -10%;
  transform: translate(-50%, -50%);
  width: calc(100% + 10px * (var(--ring-delay, 0) + 1));
  height: calc(100% + 10px * (var(--ring-delay, 0) + 1));
}
        .logo-image {
          width: 100%;
          height: 100%;
          object-fit: contain;
          position: relative;
          z-index: 2;
          border-radius: 50%;
        }

        .content-wrapper {
          text-align: center;
          max-width: 1200px;
          width: 100%;
        }

        .company-name {
          font-size: clamp(2rem, 6vw, 4rem);
          font-weight: 700;
          color: white;
          margin: 0 0 clamp(1.5rem, 3vw, 2.5rem) 0;
          line-height: 1.1;
          text-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
          animation: fadeInUp 1s ease-out 0.2s forwards;
          animation-fill-mode: both;
        }

        .slogan-section {
          margin-bottom: clamp(2rem, 4vw, 3rem);
          animation: fadeInUp 1s ease-out 0.4s forwards;
          animation-fill-mode: both;
        }

        .tagline-wrapper {
          margin-bottom: clamp(1.5rem, 3vw, 2rem);
          text-align: center;
        }

        .main-tagline {
          font-size: clamp(1.1rem, 2.8vw, 1.4rem);
          color: white;
          font-weight: 600;
          margin: 0 0 0.5rem 0;
          line-height: 1.4;
          text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        .sub-tagline {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: hsl(200, 70%, 70%);
          font-weight: 500;
          margin: 0;
          font-style: italic;
          opacity: 0.9;
          text-shadow: 0 0 10px hsla(200, 70%, 50%, 0.3);
        }

        .services-tabs {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: clamp(0.5rem, 1.5vw, 1rem);
          margin-top: clamp(1.5rem, 3vw, 2rem);
          max-width: 1000px;
          margin-left: auto;
          margin-right: auto;
        }

        .service-tab {
          background: linear-gradient(135deg, 
            hsla(200, 70%, 15%, 0.6), 
            hsla(240, 70%, 15%, 0.7),
            hsla(280, 70%, 15%, 0.6)
          );
          backdrop-filter: blur(10px);
          border: 1px solid hsla(220, 70%, 50%, 0.3);
          border-radius: 25px;
          padding: clamp(0.5rem, 1.5vw, 0.75rem) clamp(0.8rem, 2vw, 1.2rem);
          font-size: clamp(0.8rem, 1.8vw, 0.9rem);
          font-weight: 500;
          color: white;
          text-align: center;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          white-space: nowrap;
          min-width: fit-content;
          box-shadow: 0 2px 10px hsla(220, 70%, 50%, 0.1);
          will-change: transform;
        }

        .service-tab::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent, 
            hsla(220, 70%, 60%, 0.2), 
            transparent
          );
          transition: left 0.6s ease;
        }

        .service-tab:hover::before {
          left: 100%;
        }

        .service-tab:hover {
          transform: translateY(-2px) scale(1.02);
          border-color: hsla(220, 70%, 50%, 0.5);
          box-shadow: 0 4px 20px hsla(220, 70%, 50%, 0.2);
          background: linear-gradient(135deg, 
            hsla(200, 70%, 20%, 0.7), 
            hsla(240, 70%, 20%, 0.8),
            hsla(280, 70%, 20%, 0.7)
          );
        }

        .service-tab span {
          position: relative;
          z-index: 1;
        }

        .primary-description {
          font-size: clamp(1rem, 2.5vw, 1.25rem);
          color: rgb(209, 213, 219);
          line-height: 1.6;
          margin: 0 0 1.5rem 0;
          max-width: 900px;
          margin-left: auto;
          margin-right: auto;
        }

        .secondary-description {
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          color: rgb(156, 163, 175);
          line-height: 1.7;
          margin: 0;
          max-width: 800px;
          margin-left: auto;
          margin-right: auto;
        }

        .quantum-highlight {
          font-weight: 600;
          transition: all 0.3s ease;
          will-change: color;
        }

        .highlight-1 { color: hsl(180, 70%, 70%); }
        .highlight-2 { color: hsl(210, 70%, 70%); }
        .highlight-3 { color: hsl(240, 70%, 70%); }
        .highlight-4 { color: hsl(270, 70%, 70%); }
        .highlight-5 { color: hsl(300, 70%, 70%); }
        .highlight-6 { color: hsl(330, 70%, 70%); }
        .highlight-7 { color: hsl(0, 70%, 70%); }
        .highlight-8 { color: hsl(30, 70%, 70%); }
        .highlight-9 { color: hsl(60, 70%, 70%); }

        .coming-soon-section {
          margin-bottom: clamp(2rem, 4vw, 3rem);
          animation: fadeInUp 1s ease-out 0.6s forwards;
          animation-fill-mode: both;
        }

        .coming-soon-title {
          font-size: clamp(1.5rem, 4vw, 2.5rem);
          font-weight: 600;
          color: white;
          margin: 0 0 1rem 0;
          text-shadow: 0 0 20px hsla(200, 70%, 50%, 0.5);
        }

        .coming-soon-description {
          font-size: clamp(1rem, 2.2vw, 1.2rem);
          color: rgb(209, 213, 219);
          line-height: 1.6;
          margin: 0;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
        }

        .cta-section {
          animation: fadeInUp 1s ease-out 0.8s forwards;
          animation-fill-mode: both;
        }

        .quantum-cta-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: clamp(0.8rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem);
          border-radius: 1rem;
          background: linear-gradient(135deg, hsla(200, 70%, 20%, 0.8), hsla(240, 70%, 20%, 0.9));
          backdrop-filter: blur(10px);
          border: 2px solid hsla(220, 70%, 50%, 0.4);
          color: white;
          font-weight: 600;
          font-size: clamp(0.9rem, 2vw, 1.1rem);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 20px hsla(220, 70%, 50%, 0.2);
          will-change: transform;
        }

        .quantum-cta-button::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, hsla(220, 70%, 60%, 0.2), transparent);
          transition: left 0.6s ease;
        }

        .quantum-cta-button:hover::before {
          left: 100%;
        }

        .quantum-cta-button:hover {
          transform: translateY(-2px) scale(1.02);
          box-shadow: 0 8px 30px hsla(220, 70%, 50%, 0.3);
        }

        .quantum-cta-button:active {
          transform: translateY(-1px) scale(1.01);
        }

        .cta-icon {
          width: 1.2em;
          height: 1.2em;
          flex-shrink: 0;
          transition: transform 0.3s ease;
        }

        .quantum-cta-button:hover .cta-icon {
          transform: scale(1.1);
        }

        /* Responsive Design Improvements */
        @media (max-width: 480px) {
          .quantum-container {
            min-height: 100vh;
            min-height: 100svh; /* Small viewport height for mobile browsers */
          }

          .main-content {
            padding: 1rem;
            min-height: 100vh;
            min-height: 100svh;
          }

          .company-name {
            font-size: 2rem;
            line-height: 1.2;
          }

          .main-tagline {
            font-size: 1rem;
          }

          .sub-tagline {
            font-size: 0.85rem;
          }

          .services-tabs {
            gap: 0.4rem;
            margin-top: 1rem;
          }

          .service-tab {
            font-size: 0.75rem;
            padding: 0.4rem 0.7rem;
            border-radius: 20px;
          }

          .quantum-cta-button {
            padding: 0.9rem 1.5rem;
            font-size: 0.95rem;
          }

          /* Reduce particles on very small screens */
          .quantum-particle {
            width: 3px;
            height: 3px;
          }

          .neural-particle {
            width: 60px;
          }
        }

        @media (min-width: 481px) and (max-width: 768px) {
          .main-content {
            padding: 1.5rem;
          }

          .company-name {
            font-size: 2.5rem;
          }

          .services-tabs {
            gap: 0.6rem;
          }

          .service-tab {
            font-size: 0.8rem;
            padding: 0.5rem 0.9rem;
          }

          .quantum-particle {
            width: 4px;
            height: 4px;
          }

          .neural-particle {
            width: 70px;
          }
        }

        @media (min-width: 769px) and (max-width: 1024px) {
          .main-content {
            padding: 2rem;
          }

          .company-name {
            font-size: 3rem;
          }
        }

        @media (min-width: 1025px) {
          .main-content {
            padding: 2rem;
          }

          .company-name {
            font-size: 3.5rem;
          }

          .quantum-particle {
            width: 6px;
            height: 6px;
          }

          .neural-particle {
            width: 100px;
          }

          .dimensional-particle {
            width: 60px;
            height: 60px;
          }
        }

        /* High-resolution display optimizations */
        @media (min-resolution: 2dppx) {
          .quantum-particle,
          .neural-particle,
          .dimensional-particle {
            image-rendering: crisp-edges;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .quantum-container {
            background-color: #000;
          }
        }

        /* Reduced motion support for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }

          .quantum-particle,
          .neural-particle,
          .data-particle,
          .dimensional-particle {
            animation: none !important;
            opacity: 0.3 !important;
          }

          .quantum-cta-button:hover {
            transform: none !important;
          }
        }

        /* Print styles */
        @media print {
          .particle-layer,
          .spacetime-grid,
          .holographic-ui-container,
          .interdimensional-portal {
            display: none !important;
          }

          .quantum-container {
            background: white !important;
            color: black !important;
            min-height: auto !important;
          }

          .company-name,
          .coming-soon-title {
            color: black !important;
            text-shadow: none !important;
          }

          .primary-description,
          .secondary-description,
          .coming-soon-description {
            color: #333 !important;
          }

          .quantum-cta-button {
            background: #333 !important;
            color: white !important;
            border: 2px solid #333 !important;
          }
        }

        /* Focus styles for accessibility */
        .quantum-cta-button:focus {
          outline: 3px solid hsla(220, 70%, 60%, 0.8);
          outline-offset: 2px;
        }

        /* Loading state optimization */
        .quantum-container[data-loaded="false"] .particle-layer {
          opacity: 0;
        }

        .quantum-container[data-loaded="true"] .particle-layer {
          opacity: 1;
          transition: opacity 0.5s ease-in-out;
        }

        /* Prefetch and preload hints */
        .quantum-cta-button::after {
          content: "";
          position: absolute;
          inset: 0;
          background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E");
        }

        /* Container queries for modern browsers */
        @supports (container-type: inline-size) {
          .content-wrapper {
            container-type: inline-size;
          }

          @container (max-width: 400px) {
            .company-name {
              font-size: 1.8rem;
            }
          }

          @container (min-width: 800px) {
            .primary-description {
              font-size: 1.3rem;
            }
          }
        }

        /* GPU acceleration hints */
        .quantum-container,
        .particle-layer,
        .main-content {
          transform: translateZ(0);
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Memory optimization */
        .quantum-particle[data-quantum] {
          contain: layout style paint;
        }

        /* Performance hints for browsers */
        .interdimensional-portal {
          content-visibility: auto;
          contain-intrinsic-size: 100px 100px;
        }

        .holographic-ui-container {
          content-visibility: auto;
          contain-intrinsic-size: 100vw 100vh;
        }

        /* Critical resource hints */
        .logo-image {
          image-rendering: optimizeQuality;
          image-rendering: -webkit-optimize-contrast;
        }

        /* Smooth scrolling for supported browsers */
        @supports (scroll-behavior: smooth) {
          html {
            scroll-behavior: smooth;
          }
        }

        /* Enhanced focus indicators */
        .quantum-cta-button:focus-visible {
          outline: 3px solid #60a5fa;
          outline-offset: 3px;
          box-shadow: 0 0 0 6px hsla(220, 70%, 50%, 0.2);
        }

        /* Loading spinner for logo if needed */
        .logo-image[loading] {
          background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
          background-size: 200% 100%;
          animation: loading-shimmer 1.5s infinite;
        }

        @keyframes loading-shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }

        /* Intersection observer optimizations */
        .particle-layer[data-visible="false"] {
          visibility: hidden;
        }

        .particle-layer[data-visible="true"] {
          visibility: visible;
        }
      `}</style>
    </>
  );
};

export default ComingSoonPage;