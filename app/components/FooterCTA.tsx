'use client'
import React from 'react';

type AnimateComp = React.ComponentType<{
  children: React.ReactNode;
  threshold?: number;
  animationClass?: string;
  delay?: number;
}>;

interface FooterCTAProps {
  AnimateOnScroll: AnimateComp;
}

export default function FooterCTA({ AnimateOnScroll }: FooterCTAProps) {
  return (
    <section id="contact" className="py-24 sm:py-32 px-6 relative">
      <div className="max-w-4xl mx-auto text-center">
        <AnimateOnScroll>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent">
            Ready to Dominate Your Market?
          </h2>
        </AnimateOnScroll>
        <AnimateOnScroll delay={100}>
          <p className="text-gray-300 text-xl sm:text-2xl mb-12 leading-relaxed">
            Let's discuss how strategic marketing and custom development can transform your business and leave your competition behind.
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
            <span className="relative z-10">Book Your Strategy Session</span>
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}