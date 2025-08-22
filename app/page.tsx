// 'use client'
// import Head from 'next/head';
// import { useEffect, useState, useRef, useCallback } from 'react';
// import { createPortal } from 'react-dom';

// // Import components
// import Header from './components/Header';
// import Hero from './components/Hero';

// import Services from './components/Services';
// import FooterCTA from './components/FooterCTA';
// import WebDesign

// from './components/WebDesign';
// // Modal Component
// type ServiceModalProps = {
//   isOpen: boolean;
//   onClose: () => void;
//   title: string;
//   content: string | string[];
// };

// const ServiceModal = ({ isOpen, onClose, title, content }: ServiceModalProps) => {
//   if (!isOpen) return null;

//   return createPortal(
//     <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in">
//       <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up">
//         <button
//           onClick={onClose}
//           className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all duration-300 text-3xl font-light hover:rotate-90 hover:scale-110"
//           aria-label="Close modal"
//         >
//           ×
//         </button>
//         <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 mb-8 pb-4 border-b border-gradient-to-r from-blue-400/30 to-purple-400/30">
//           {title}
//         </h3>
//         <div className="text-gray-300 text-lg lg:text-xl leading-relaxed space-y-6">
//           {Array.isArray(content) ? (
//             content.map((paragraph, index) => (
//               <p key={index} className="hover:text-white transition-colors duration-300">
//                 {paragraph}
//               </p>
//             ))
//           ) : (
//             <p className="hover:text-white transition-colors duration-300">{content}</p>
//           )}
//         </div>
//       </div>
//     </div>,
//     document.body
//   );
// };

// // Enhanced AnimateOnScroll Component
// const AnimateOnScroll = ({
//   children,
//   threshold = 0.2,
//   animationClass = 'animate-fade-in-up',
//   delay = 0
// }: {
//   children: React.ReactNode;
//   threshold?: number;
//   animationClass?: string;
//   delay?: number;
// }) => {
//   const domRef = useRef(null);
//   const [isVisible, setVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setTimeout(() => setVisible(true), delay);
//           }
//         });
//       },
//       { threshold }
//     );

//     const currentRef = domRef.current;
//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef);
//       }
//     };
//   }, [threshold, delay]);

//   return (
//     <div
//       ref={domRef}
//       className={`transition-all duration-1000 ${
//         isVisible ? animationClass : 'opacity-0 translate-y-12'
//       }`}
//     >
//       {children}
//     </div>
//   );
// };

// // Testimonial Component
// const TestimonialCard = ({ quote, author, title, company, delay = 0 }: {
//   quote: string;
//   author: string;
//   title: string;
//   company: string;
//   delay?: number;
// }) => (
//   <AnimateOnScroll delay={delay} animationClass="animate-fade-in-up">
//     <div className="glass-card bg-gradient-to-br from-purple-900/10 to-blue-900/5 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8 lg:p-10 hover:from-purple-900/15 hover:to-blue-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-purple-500/10 group">
//       <div className="text-blue-400 text-6xl mb-6 opacity-50 group-hover:opacity-80 transition-opacity duration-300">"</div>
//       <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
//         {quote}
//       </p>
//       <div className="border-t border-white/20 pt-6">
//         <p className="text-white text-xl font-semibold">{author}</p>
//         <p className="text-blue-400 text-lg">{title}</p>
//         <p className="text-gray-400 text-base">{company}</p>
//       </div>
//     </div>
//   </AnimateOnScroll>
// );

// // Stats Component
// const StatsCard = ({ number, label, suffix = '', delay = 0 }: {
//   number: number;
//   label: string;
//   suffix?: string;
//   delay?: number;
// }) => {
//   const [count, setCount] = useState(0);
//   const [hasStarted, setHasStarted] = useState(false);

//   const domRef = useRef(null);
//   const [isVisible, setIsVisible] = useState(false);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) {
//             setIsVisible(true);
//           }
//         });
//       },
//       { threshold: 0.5 }
//     );

//     const currentRef = domRef.current;
//     if (currentRef) {
//       observer.observe(currentRef);
//     }

//     return () => {
//       if (currentRef) {
//         observer.unobserve(currentRef);
//       }
//     };
//   }, []);

//   useEffect(() => {
//     if (isVisible && !hasStarted) {
//       const duration = 2000;
//       const increment = number / (duration / 16);
//       let start = 0;

//       const timer = setInterval(() => {
//         start += increment;
//         if (start >= number) {
//           setCount(number);
//           clearInterval(timer);
//           setHasStarted(true);
//         } else {
//           setCount(Math.floor(start));
//         }
//       }, 16);

//       return () => clearInterval(timer);
//     }
//   }, [isVisible, number, hasStarted]);

//   return (
//     <div
//       ref={domRef}
//       className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
//     >
//       <div className="text-center group">
//         <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
//           {count}{suffix}
//         </div>
//         <p className="text-gray-400 text-lg lg:text-xl group-hover:text-white transition-colors duration-300">
//           {label}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default function Home() {
//   const [scrollY, setScrollY] = useState(0);
//   const statsRef = useRef(null);
//   const [statsVisible, setStatsVisible] = useState(false);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [modalContent, setModalContent] = useState<{ title: string; content: string[] }>({ title: '', content: [] });

//   useEffect(() => {
//     const particlesContainer = document.getElementById('particles');
//     if (particlesContainer) {
//       const particleCount = 80;
//       for (let i = 0; i < particleCount; i++) {
//         const particle = document.createElement('div');
//         particle.className = 'particle';
//         particle.style.left = Math.random() * 100 + '%';
//         particle.style.animationDelay = Math.random() * 20 + 's';
//         particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
//         particle.style.opacity = (Math.random() * 0.8 + 0.2).toString();
//         particlesContainer.appendChild(particle);
//       }
//     }

//     const handleScroll = () => {
//       setScrollY(window.scrollY);
//     };

//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting && !statsVisible) {
//             setStatsVisible(true);
//           }
//         });
//       },
//       { threshold: 0.3 }
//     );

//     if (statsRef.current) {
//       observer.observe(statsRef.current);
//     }

//     window.addEventListener('scroll', handleScroll);
//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//       if (statsRef.current) {
//         observer.unobserve(statsRef.current);
//       }
//     };
//   }, [statsVisible]);

//   const openModal = (title: string, content: string[]) => {
//     setModalContent({ title, content });
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setModalContent({ title: '', content: [] });
//     setIsModalOpen(false);
//   };

//   return (
//     <>
//       <Head>
//         <title>Digital Marketing & Custom Development | Lincoln, Nebraska</title>
//         <meta name="description" content="Strategic digital marketing and custom development for businesses ready to scale. Based in Lincoln, Nebraska, serving clients nationwide." />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <meta name="keywords" content="digital marketing Lincoln Nebraska, custom development, web design, SEO, branding, email marketing" />
//       </Head>

//       {/* REMOVED THE BOUNCY BACKGROUND - NO MORE SCREEN JUMPING! */}
//       <div className="particles fixed inset-0 -z-10 pointer-events-none" id="particles"></div>

//       <Header scrollY={scrollY} />

//       <main className="font-sans text-white overflow-x-hidden text-lg lg:text-xl leading-relaxed">
//         {/* Hero Section */}
//         <Hero />

//         {/* Services Section */}
//         <Services />
//         <WebDesign />
   
       

//         {/* Footer CTA Section */}
//         <FooterCTA AnimateOnScroll={AnimateOnScroll} />
//       </main>

//       <ServiceModal
//         isOpen={isModalOpen}
//         onClose={closeModal}
//         title={modalContent.title}
//         content={modalContent.content}
//       />
//     </>
//   );
// }






'use client'
import Head from 'next/head';
import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Import your coming soon component
import ComingSoonPage from './comingsoon';

// Import your existing components
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import FooterCTA from './components/FooterCTA';
import WebDesign from './components/WebDesign';

// TOGGLE THIS TO SWITCH BETWEEN COMING SOON AND FULL SITE
const SHOW_COMING_SOON = true; // Set to false to show your full website

// Modal Component (your existing code)
type ServiceModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | string[];
};

const ServiceModal = ({ isOpen, onClose, title, content }: ServiceModalProps) => {
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[100] p-4 animate-fade-in">
      <div className="bg-gradient-to-br from-slate-900/95 to-slate-800/95 backdrop-blur-2xl border border-blue-400/30 rounded-3xl p-8 lg:p-12 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative shadow-2xl animate-scale-up">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-white transition-all duration-300 text-3xl font-light hover:rotate-90 hover:scale-110"
          aria-label="Close modal"
        >
          ×
        </button>
        <h3 className="text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 mb-8 pb-4 border-b border-gradient-to-r from-blue-400/30 to-purple-400/30">
          {title}
        </h3>
        <div className="text-gray-300 text-lg lg:text-xl leading-relaxed space-y-6">
          {Array.isArray(content) ? (
            content.map((paragraph, index) => (
              <p key={index} className="hover:text-white transition-colors duration-300">
                {paragraph}
              </p>
            ))
          ) : (
            <p className="hover:text-white transition-colors duration-300">{content}</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

// Enhanced AnimateOnScroll Component (your existing code)
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

// Testimonial Component (your existing code)
const TestimonialCard = ({ quote, author, title, company, delay = 0 }: {
  quote: string;
  author: string;
  title: string;
  company: string;
  delay?: number;
}) => (
  <AnimateOnScroll delay={delay} animationClass="animate-fade-in-up">
    <div className="glass-card bg-gradient-to-br from-purple-900/10 to-blue-900/5 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8 lg:p-10 hover:from-purple-900/15 hover:to-blue-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-purple-500/10 group">
      <div className="text-blue-400 text-6xl mb-6 opacity-50 group-hover:opacity-80 transition-opacity duration-300">"</div>
      <p className="text-gray-300 text-lg lg:text-xl leading-relaxed mb-8 group-hover:text-white transition-colors duration-300">
        {quote}
      </p>
      <div className="border-t border-white/20 pt-6">
        <p className="text-white text-xl font-semibold">{author}</p>
        <p className="text-blue-400 text-lg">{title}</p>
        <p className="text-gray-400 text-base">{company}</p>
      </div>
    </div>
  </AnimateOnScroll>
);

// Stats Component (your existing code)
const StatsCard = ({ number, label, suffix = '', delay = 0 }: {
  number: number;
  label: string;
  suffix?: string;
  delay?: number;
}) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const domRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
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
  }, []);

  useEffect(() => {
    if (isVisible && !hasStarted) {
      const duration = 2000;
      const increment = number / (duration / 16);
      let start = 0;

      const timer = setInterval(() => {
        start += increment;
        if (start >= number) {
          setCount(number);
          clearInterval(timer);
          setHasStarted(true);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isVisible, number, hasStarted]);

  return (
    <div
      ref={domRef}
      className={`transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
    >
      <div className="text-center group">
        <div className="text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 group-hover:scale-110 transition-transform duration-300">
          {count}{suffix}
        </div>
        <p className="text-gray-400 text-lg lg:text-xl group-hover:text-white transition-colors duration-300">
          {label}
        </p>
      </div>
    </div>
  );
};

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<{ title: string; content: string[] }>({ title: '', content: [] });

  useEffect(() => {
    // Only run this if we're showing the full site
    if (!SHOW_COMING_SOON) {
      const particlesContainer = document.getElementById('particles');
      if (particlesContainer) {
        const particleCount = 80;
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'particle';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.animationDelay = Math.random() * 20 + 's';
          particle.style.animationDuration = (Math.random() * 15 + 15) + 's';
          particle.style.opacity = (Math.random() * 0.8 + 0.2).toString();
          particlesContainer.appendChild(particle);
        }
      }

      const handleScroll = () => {
        setScrollY(window.scrollY);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && !statsVisible) {
              setStatsVisible(true);
            }
          });
        },
        { threshold: 0.3 }
      );

      if (statsRef.current) {
        observer.observe(statsRef.current);
      }

      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (statsRef.current) {
          observer.unobserve(statsRef.current);
        }
      };
    }
  }, [statsVisible]);

  const openModal = (title: string, content: string[]) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setModalContent({ title: '', content: [] });
    setIsModalOpen(false);
  };

  // If SHOW_COMING_SOON is true, only render the coming soon page
  if (SHOW_COMING_SOON) {
    return <ComingSoonPage />;
  }

  // Otherwise, render your full website
  return (
    <>
      <Head>
        <title>Digital Marketing & Custom Development | Lincoln, Nebraska</title>
        <meta name="description" content="Strategic digital marketing and custom development for businesses ready to scale. Based in Lincoln, Nebraska, serving clients nationwide." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="digital marketing Lincoln Nebraska, custom development, web design, SEO, branding, email marketing" />
      </Head>

      <div className="particles fixed inset-0 -z-10 pointer-events-none" id="particles"></div>

      <Header scrollY={scrollY} />

      <main className="font-sans text-white overflow-x-hidden text-lg lg:text-xl leading-relaxed">
        <Hero />
        <Services />
        <WebDesign />
        <FooterCTA AnimateOnScroll={AnimateOnScroll} />
      </main>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
      />
    </>
  );
}