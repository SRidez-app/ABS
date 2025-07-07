'use client'
import Head from 'next/head';
import { useEffect, useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

// Modal Component
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

// Testimonial Component
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

// Stats Component
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
  }, [statsVisible]);

  const smoothScroll = useCallback((e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, []);

  const openModal = (title: string, content: string[]) => {
    setModalContent({ title, content });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalContent({ title: '', content: [] });
  };

  const servicesData = [
    {
      icon: '🌐',
      title: 'AI-Powered Website Development',
      desc: 'Create stunning, high-performance websites using AI-driven tools to accelerate development, optimize user experience, and reduce costs.',
      details: [
        'Custom Website Development',
        'Progressive Web Apps (PWAs)',
        'AI-Assisted UI/UX Design',
        'Automated Testing & QA',
        'Cloud Deployment'
      ],
  longDesc: [
  'Your website is your digital storefront—and we build it smarter. With AI tools like code generators, design optimizers, and automated testing, we deliver scalable websites up to 40% faster and 30% more cost-effectively.',
  'We begin with a strategic consultation to define goals, then use AI-assisted UI/UX tools and A/B testing to ensure high engagement. Sites are built on fast, scalable frameworks like React or Next.js.',
  'We also build Progressive Web Apps (PWAs) for offline use and app-like functionality—boosting engagement by 50% on average.',
  'Let’s create an AI-optimized website that drives results and reduces costs.'
],

    },
    {
      icon: '📱',
      title: 'AI-Enhanced Mobile App Development',
      desc: 'Develop cross-platform mobile apps with AI-accelerated coding, testing, and personalization, delivering seamless user experiences at reduced costs.',
      details: [
        'Cross-Platform App Development',
        'AI-Personalized User Experiences',
        'Scalable Backend APIs',
        'Automated Testing & Debugging',
        'App Store Optimization',
        'Code Ownership Transparency'
      ],
  longDesc: [
  'Engage users with high-performance mobile apps—built faster and smarter using AI. We develop cross-platform apps with React Native or Flutter, reducing dev time by 35% while cutting costs.',
  'AI personalization tailors user experiences in real time, boosting retention and satisfaction.',
  'Our agile process includes collaborative wireframes, AI-optimized user flows, and automated testing that reduces QA time by 20%. Backends are built to scale using Node.js or Python, with secure cloud deployment via AWS.',
  '**Code Ownership**: You own your code. We prioritize transparency and IP control from day one.',
  'Let’s bring your app idea to life—smarter, faster, and built to scale.'
],

    },
    {
      icon: '🗄️',
      title: 'AI-Optimized Database Solutions',
      desc: 'Design and manage scalable, secure database structures using AI to optimize performance, automate maintenance, and reduce operational costs.',
      details: [
        'Database Schema Design',
        'AI-Driven Query Optimization',
        'Real-Time Data Processing',
        'Automated Backups & Maintenance',
        'Secure Data Encryption',
        'Cloud-Native Integration'
      ],
longDesc: [
  'Power your apps with fast, scalable databases—optimized by AI to boost performance and cut costs.',
  'We design schemas using PostgreSQL, MongoDB, or Supabase, with AI-driven query tuning improving speed by up to 50%.',
  'Real-time data processing and automated indexing ensure responsiveness, while AI-managed backups and scaling reduce ops costs by 25%.',
  'Security comes built-in with end-to-end encryption and compliance-ready frameworks (e.g., GDPR, HIPAA). Cloud-native setups scale effortlessly via AWS or Supabase.',
  '**Cost Savings**: Our AI-first approach reduces manual database work and server spend.',
  'Let’s build a future-proof data solution that scales with your growth.'
],

    }
  ];

  const testimonials = [
    {
      quote: 'Ayubzai’s AI-powered website cut our development time in half and boosted conversions by 45%. Their cost-effective approach was a game-changer.',
      author: 'Sarah Thompson',
      title: 'CEO',
      company: 'ShopTrend Innovations'
    },
    {
      quote: 'Their AI-enhanced mobile app doubled our user retention with personalized features. Full code ownership gave us confidence in our investment.',
      author: 'Mike Rodriguez',
      title: 'Founder',
      company: 'FitPulse Tech'
    },
    {
      quote: 'The AI-optimized database they built slashed our query times by 40% and saved 20% on server costs. It’s the backbone of our app’s success.',
      author: 'Jennifer Chen',
      title: 'CTO',
      company: 'DataFlow Solutions'
    }
  ];

  return (
    <>
      <Head>
        <title>Ayubzai Business Solutions - Offering AI-Powered Software Development</title>
        <meta name="description" content="Transform your business with AI-powered website, mobile app, and database solutions. Cost-efficient, scalable, and innovative software development." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="AI software development, website development, mobile apps, database design, cost-efficient development" />
      </Head>

      <div className="bg-animation fixed inset-0 -z-20"></div>
      <div className="particles fixed inset-0 -z-10 pointer-events-none" id="particles"></div>

      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 px-6 sm:px-10 py-6 ${
          scrollY > 100
            ? 'backdrop-blur-2xl bg-black/95 border-b border-white/30 shadow-2xl'
            : 'backdrop-blur-xl bg-black/80 border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 hover:scale-105 transition-transform duration-300">
            A.B.S
          </div>
          <ul className="hidden md:flex gap-8 text-lg text-gray-300">
            {['home', 'ai-advantage', 'about', 'services', 'contact'].map((section) => (
              <li key={section}>
                <a
                  href={`#${section}`}
                  onClick={(e) => smoothScroll(e, `#${section}`)}
                  className="hover:text-white transition-all duration-300 relative group capitalize hover:scale-105"
                >
                  {section.replace('-', ' ')}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 group-hover:w-full transition-all duration-300"></span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main className="font-sans text-white overflow-x-hidden text-lg lg:text-xl leading-relaxed">
        {/* Hero Section */}
        {/* Hero Section */}
        <section id="home" className="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative">
       <div className="hero-content animate-fade-in-up max-w-5xl flex flex-col items-center space-y-6">
  <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent leading-tight text-center">
    Ayubzai Business Solutions
  </h1>

  <p className="text-xl sm:text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto leading-relaxed font-light text-center">
    Get High-Performance Software Built Faster
  </p>

  <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed text-center">
    AI-powered development delivers websites, mobile apps, and databases that boost user engagement by 50% while cutting your development budget.
  </p>

  <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm sm:text-base">
              <div className="flex items-center px-4 py-2 bg-green-500/10 border border-green-400/30 rounded-full text-green-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
             Faster Delivery
              </div>
              <div className="flex items-center px-4 py-2 bg-blue-500/10 border border-blue-400/30 rounded-full text-blue-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
                Cost Savings
              </div>
              <div className="flex items-center px-4 py-2 bg-purple-500/10 border border-purple-400/30 rounded-full text-purple-300">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                </svg>
              Higher Engagement
              </div>
            </div>
             </div>
          {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center animate-bounce">
            <div className="w-1 h-12 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full mb-2"></div>
            <span className="text-gray-400 text-sm">Scroll</span>
          </div> */}
        </section>

        {/* AI Advantage Section */}
        <section id="ai-advantage" className="py-24 sm:py-32 px-6 relative overflow-hidden">
          <div className="max-w-7xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-12 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
                The AI Development Advantage
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
              <AnimateOnScroll delay={100}>
                <div className="glass-card bg-gradient-to-br from-blue-900/10 to-teal-900/5 backdrop-blur-xl border border-blue-400/20 rounded-3xl p-8 hover:from-blue-900/15 hover:to-teal-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-blue-500/10">
                  <div className="text-5xl mb-6">🧠</div>
                  <h3 className="text-3xl font-bold text-white mb-4">AI-Accelerated Coding</h3>
                  <p className="text-gray-300">Use AI code generation to build features faster, reducing development time and costs by up to 40%.</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={200}>
                <div className="glass-card bg-gradient-to-br from-purple-900/10 to-indigo-900/5 backdrop-blur-xl border border-purple-400/20 rounded-3xl p-8 hover:from-purple-900/15 hover:to-indigo-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-purple-500/10">
                  <div className="text-5xl mb-6">⚡</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Automated Testing</h3>
                  <p className="text-gray-300">AI-driven testing ensures bug-free code, cutting QA costs by 20% while improving reliability.</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
                <div className="glass-card bg-gradient-to-br from-pink-900/10 to-red-900/5 backdrop-blur-xl border border-pink-400/20 rounded-3xl p-8 hover:from-pink-900/15 hover:to-red-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-pink-500/10">
                  <div className="text-5xl mb-6">📊</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Performance Optimization</h3>
                  <p className="text-gray-300">AI analyzes data and user behavior to optimize app and database performance, enhancing scalability.</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={400}>
                <div className="glass-card bg-gradient-to-br from-emerald-900/10 to-cyan-900/5 backdrop-blur-xl border border-emerald-400/20 rounded-3xl p-8 hover:from-emerald-900/15 hover:to-cyan-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-emerald-500/10">
                  <div className="text-5xl mb-6">💡</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Personalized Experiences</h3>
                  <p className="text-gray-300">AI tailors user journeys in apps and websites, boosting engagement and retention rates.</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={500}>
                <div className="glass-card bg-gradient-to-br from-yellow-900/10 to-orange-900/5 backdrop-blur-xl border border-yellow-400/20 rounded-3xl p-8 hover:from-yellow-900/15 hover:to-orange-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-yellow-500/10">
                  <div className="text-5xl mb-6">🛠️</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Cost Efficiency</h3>
                  <p className="text-gray-300">AI automation reduces overhead, enabling high-quality development at competitive prices.</p>
                </div>
              </AnimateOnScroll>
              <AnimateOnScroll delay={600}>
                <div className="glass-card bg-gradient-to-br from-gray-900/10 to-zinc-900/5 backdrop-blur-xl border border-gray-400/20 rounded-3xl p-8 hover:from-gray-900/15 hover:to-zinc-900/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-xl shadow-gray-500/10">
                  <div className="text-5xl mb-6">📈</div>
                  <h3 className="text-3xl font-bold text-white mb-4">Scalable Architecture</h3>
                  <p className="text-gray-300">Build systems that grow effortlessly, supported by AI-optimized databases and cloud infrastructure.</p>
                </div>
              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 sm:py-32 px-6 relative">
          <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
            <AnimateOnScroll>
              <div className="relative overflow-hidden rounded-3xl shadow-2xl group">
                <img
                  src="/robot.png"
                  alt="Abstract AI brain"
                  className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-purple-800/20 to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center text-white text-3xl font-bold p-8 text-center">
                  Innovating Software with AI
                </div>
              </div>
            </AnimateOnScroll>
            <div className="text-left">
              <AnimateOnScroll>
                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 bg-gradient-to-r from-green-400 via-teal-500 to-blue-400 bg-clip-text text-transparent">
                  About Ayubzai Business Solutions
                </h2>
              </AnimateOnScroll>
              <AnimateOnScroll delay={100}>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  At Ayubzai  Business Solutions, we redefine software development with AI-driven innovation. Our mission is to deliver high-quality websites, mobile apps, and database solutions that empower businesses to thrive, all while reducing costs through intelligent automation.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={200}>
                <p className="text-gray-300 mb-8 leading-relaxed">
                  With expertise in AI-accelerated development, we craft scalable, user-centric products that drive growth. Our transparent approach, including full code ownership, ensures you control your digital assets, fostering long-term partnerships built on trust.
                </p>
              </AnimateOnScroll>
              <AnimateOnScroll delay={300}>
             <a
  href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-lg"
>
  Connect With Us
</a>

              </AnimateOnScroll>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="py-24 sm:py-32 px-6 relative">
          <div className="max-w-7xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 bg-clip-text text-transparent">
                Our Core Solutions
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {servicesData.map((service, index) => (
                <AnimateOnScroll key={index} delay={index * 100}>
                  <div className="glass-card bg-gradient-to-br from-slate-800/20 to-gray-800/10 backdrop-blur-xl border border-white/10 rounded-3xl p-8 flex flex-col items-center text-center h-full hover:from-slate-800/30 hover:to-gray-800/20 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl shadow-white/5">
                    <div className="text-6xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-gray-300 text-lg mb-6 flex-grow">
                      {service.desc}
                    </p>
                    <ul className="text-gray-400 text-base space-y-2 mb-8 text-left w-full">
                      {service.details.map((detail, i) => (
                        <li key={i} className="flex items-center">
                          <svg className="w-4 h-4 mr-2 text-blue-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                          </svg>
                          {detail}
                        </li>
                      ))}
                    </ul>
                    <button
                      onClick={() => openModal(service.title, service.longDesc)}
                      className="mt-auto px-6 py-3 rounded-full font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-blue-500/50 transition-all duration-300 hover:-translate-y-1 hover:scale-105 text-md"
                    >
                      Learn More
                    </button>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Success Stories / Testimonials Section */}
        {/* <section id="success" className="py-24 sm:py-32 px-6 relative"> */}
          {/* <div className="max-w-7xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 bg-gradient-to-r from-yellow-400 via-orange-500 to-red-400 bg-clip-text text-transparent">
                Client Success Stories
              </h2>
            </AnimateOnScroll>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard
                  key={index}
                  quote={testimonial.quote}
                  author={testimonial.author}
                  title={testimonial.title}
                  company={testimonial.company}
                  delay={index * 150}
                />
              ))}
            </div>
          </div> */}
        {/* </section> */}

        {/* Stats Section */}
        <section className="py-24 sm:py-32 px-6 relative bg-gradient-to-br from-black/50 to-blue-900/10 rounded-3xl mx-auto max-w-7xl border border-blue-400/20 shadow-xl">
          <div className="max-w-7xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-16 bg-gradient-to-r from-teal-400 via-green-500 to-blue-400 bg-clip-text text-transparent">
                Impact by the Numbers
              </h2>
            </AnimateOnScroll>
            <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
              <StatsCard number={40} label="Reduction in Dev Time" suffix="%" />
              <StatsCard number={30} label="Cost Savings via AI" suffix="%" delay={100} />
              <StatsCard number={50} label="Avg. Engagement Increase" suffix="%" delay={200} />
              <StatsCard number={100} label="Client Satisfaction" suffix="%" delay={300} />
            </div>
          </div>
        </section>

        {/* Call to Action / Contact Section */}
        <section id="contact" className="py-24 sm:py-32 px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            <AnimateOnScroll>
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
                Ready to Build Your Software Future?
              </h2>
            </AnimateOnScroll>
            <AnimateOnScroll delay={100}>
              <p className="text-gray-300 text-xl sm:text-2xl mb-12 leading-relaxed">
                Unlock cost-efficient, scalable, and innovative software solutions with Ayubzai. Let’s create websites, apps, and databases that drive your success.
              </p>
            </AnimateOnScroll>
            <AnimateOnScroll delay={200}>
              <a
                href="https://calendly.com/hello-ayubzaibusinesssolutions/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-block px-12 py-6 rounded-full font-bold bg-gradient-to-r from-blue-600 to-purple-700 text-white text-xl shadow-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-purple-500/60 hover:scale-105"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-shimmer"></span>
                <span className="relative z-10">Book Your Free Consultation</span>
              </a>
            </AnimateOnScroll>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 text-center text-gray-400 text-md border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto">
          <p className="mb-4">
            © {new Date().getFullYear()} Ayubzai Business Solutions. All rights reserved.
          </p>
<div className="flex justify-center gap-6 mb-4">
  <a href="/privacy" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
<a href="/terms" className="hover:text-white transition-colors duration-300">Terms of Service</a>

</div>

          <p className="text-sm">
            Designed and Developed by Ayubzai Business Solutions.
          </p>
        </div>
      </footer>

      <ServiceModal
        isOpen={isModalOpen}
        onClose={closeModal}
        title={modalContent.title}
        content={modalContent.content}
      />

      <style jsx global>{`
        * {
          scroll-behavior: smooth;
        }
        body {
          background: #0a0a0a;
          overflow-x: hidden;
          font-family: 'Inter', sans-serif;
        }
        .bg-animation {
          background: radial-gradient(circle at 20% 50%, rgba(103, 126, 234, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 80% 20%, rgba(118, 75, 162, 0.15) 0%, transparent 50%),
                      radial-gradient(circle at 40% 80%, rgba(75, 172, 254, 0.15) 0%, transparent 50%);
          animation: bgFloat 20s ease-in-out infinite;
        }
        @keyframes bgFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          33% { transform: translateY(-20px) rotate(1deg); }
          66% { transform: translateY(10px) rotate(-1deg); }
        }
        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(103, 126, 234, 0.8);
          border-radius: 50%;
          animation: float 15s linear infinite;
        }
        @keyframes float {
          0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-10vh) rotate(360deg); opacity: 0; }
        }
        .animate-fade-in-up {
          animation: fadeInUp 1s ease-out forwards;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
          animation: shimmer 2s ease-in-out infinite;
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .glass-card {
          backdrop-filter: blur(25px);
          -webkit-backdrop-filter: blur(25px);
          position: relative;
          overflow: hidden;
        }
        .glass-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(103, 126, 234, 0.5), transparent);
          transform: scaleX(0);
          transition: transform 0.3s ease;
        }
        .glass-card:hover::before {
          transform: scaleX(1);
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-up {
          from { transform: scale(0.9); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </>
  );
}