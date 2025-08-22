'use client'
import React from 'react';

type AnimateComp = React.ComponentType<{
  children: React.ReactNode;
  threshold?: number;
  animationClass?: string;
  delay?: number;
}>;

export default function Mission({ AnimateOnScroll }: { AnimateOnScroll: AnimateComp }) {
  return (
    <div className="services-title-container">
      <AnimateOnScroll>
        <h2 className="services-main-title-far-left">
          Services
        </h2>
      </AnimateOnScroll>
    </div>
  );
}