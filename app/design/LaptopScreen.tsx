import React, { useEffect, useState, useRef } from 'react';



// Dynamic Network Background Component
const DynamicNetworkBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Network configuration
  const nodeCount = 60; // Reduced for laptop screen
  const connectionDistance = 120;
  const pulseSpeed = 0.010;
  const rotationSpeed = 0.0005;

  useEffect(() => {
    const updateDimensions = () => {
      if (canvasRef.current && canvasRef.current.parentElement) {
        const parent = canvasRef.current.parentElement;
        setDimensions({
          width: parent.clientWidth,
          height: parent.clientHeight
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // SurveillanceNode class
    class SurveillanceNode {
      x: number;
      y: number;
      z: number;
      originalX: number;
      originalY: number;
      originalZ: number;
      pulseOffset: number;
      baseSize: number;
      isHub: boolean;

      constructor(x: number, y: number, z: number) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.originalX = x;
        this.originalY = y;
        this.originalZ = z;
        this.pulseOffset = Math.random() * Math.PI * 2;
        this.baseSize = Math.random() * 2.5 + 1.5;
        this.isHub = Math.random() < 0.1;
      }

      update(time: number) {
        const cos = Math.cos(time * rotationSpeed);
        const sin = Math.sin(time * rotationSpeed);
        
        this.x = this.originalX * cos - this.originalZ * sin;
        this.z = this.originalX * sin + this.originalZ * cos;
        this.y = this.originalY + Math.sin(time * 0.0003 + this.pulseOffset) * 8;
      }

      project(centerX: number, centerY: number) {
        const perspective = 1000;
        const scale = perspective / (perspective + this.z);
        return {
          x: centerX + this.x * scale,
          y: centerY + this.y * scale,
          scale: scale,
          z: this.z
        };
      }
    }

    // Create network nodes
    const nodes: SurveillanceNode[] = [];
    
    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      const radius = Math.random() * 200 + 60; // Adjusted for laptop screen
      
      const x = radius * Math.sin(phi) * Math.cos(theta);
      const y = radius * Math.sin(phi) * Math.sin(theta);
      const z = radius * Math.cos(phi);
      
      nodes.push(new SurveillanceNode(x, y, z));
    }

    // Add hub nodes
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const radius = 30;
      const node = new SurveillanceNode(
        Math.cos(angle) * radius,
        Math.sin(angle) * radius,
        (Math.random() - 0.5) * 60
      );
      node.isHub = true;
      nodes.push(node);
    }

    let time = 0;
    let isRunning = true;

    const animate = () => {
      if (!isRunning) return;
      
      time += 16;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      nodes.forEach(node => node.update(time));

      const projectedNodes = nodes.map(node => ({
        ...node,
        ...node.project(centerX, centerY)
      }));

      projectedNodes.sort((a, b) => b.z - a.z);

      // Draw connections
      for (let i = 0; i < projectedNodes.length; i++) {
        for (let j = i + 1; j < projectedNodes.length; j++) {
          const nodeA = projectedNodes[i];
          const nodeB = projectedNodes[j];
          
          const dx = nodeA.x - nodeB.x;
          const dy = nodeA.y - nodeB.y;
          const dz = nodeA.z - nodeB.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (distance < connectionDistance) {
            const opacity = Math.max(0, 0.25 - (distance / connectionDistance) * 0.25);
            
            ctx.strokeStyle = `rgba(59, 130, 246, ${opacity})`;
            ctx.lineWidth = nodeA.isHub || nodeB.isHub ? 1.5 : 1;
            
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      projectedNodes.forEach(node => {
        const pulseIntensity = Math.sin(time * pulseSpeed + node.pulseOffset) * 0.4 + 0.6;
        const size = node.baseSize * node.scale * pulseIntensity;
        
        const color = node.isHub ? '34, 197, 94' : '59, 130, 246';
        const alpha = Math.max(0.1, node.scale * 0.9);
        
        // Glow effect
        const gradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, size * 3
        );
        
        gradient.addColorStop(0, `rgba(${color}, ${alpha * 0.8})`);
        gradient.addColorStop(0.4, `rgba(${color}, ${alpha * 0.3})`);
        gradient.addColorStop(1, `rgba(${color}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
        
        // Core node
        ctx.fillStyle = `rgba(${color}, ${alpha})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, size * (node.isHub ? 1.5 : 1), 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      isRunning = false;
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: 'black' }}
    />
  );
};

const LaptopWithDynamicScreen = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* MacBook Air Container with proper aspect ratio */}
      <div className="relative aspect-[16/10]">
        {/* Laptop Image */}
        <img 
          src="/laptop4.png" 
          alt="MacBook Air 13 inch showing web development animation"
          className="w-full h-full object-contain"
        />
        
        {/* Dynamic Screen Overlay - positioned for MacBook Air 13" screen */}
        <div className="absolute inset-0">
          <div 
            className="absolute overflow-hidden rounded-lg shadow-2xl"
            style={{
              left: '27%',     
              top: '14%',     
              width: '47%',    
              height: '52.7%',   
              // MacBook Air screen angle
              transform: 'perspective(1200px) rotateX(2deg) rotateY(4deg) rotateZ(-1.8deg)',
              transformOrigin: 'center bottom',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* Screen bezel effect */}
            <div className="absolute inset-0 bg-black rounded-lg"></div>
            
            {/* Inner screen container */}
            <div 
              className="w-full h-full relative overflow-hidden rounded-md"
              style={{
                margin: '2px',
                width: 'calc(100% - 4px)',
                height: 'calc(100% - 4px)'
              }}
            >
              {/* Dynamic Network Background */}
              <DynamicNetworkBackground />
              
              {/* Header Inside the Screen */}
              <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
                <div className="bg-black/60 backdrop-blur-sm border-b border-gray-700/50">
                  <div className="px-2 py-1">
                    <div className="flex items-center justify-between">
                      {/* Logo */}
                    
                      
           
                      
                      {/* Navigation - simplified for screen size */}
                      <div className="flex items-center space-x-2 text-[13px] font-medium">
                        <span className="text-blue-400 opacity-90">Home</span>
                        <span className="text-gray-300 opacity-70">How It Works</span>
                        <span className="text-gray-300 opacity-70">The Future</span>
                        <span className="text-gray-300 opacity-70">Contact</span>
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Center content - moved down to account for header */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ paddingTop: '28px' }}>
                <div className="text-center px-4">
             
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