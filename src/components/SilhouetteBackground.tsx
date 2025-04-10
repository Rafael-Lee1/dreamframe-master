
import React, { useEffect, useRef } from "react";

const SilhouetteBackground: React.FC = () => {
  const particleCanvasRef = useRef<HTMLCanvasElement>(null);
  
  // Particle system for background
  useEffect(() => {
    if (!particleCanvasRef.current) return;
    
    const canvas = particleCanvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size to match window
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Create particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      alpha: number;
    }[] = [];
    
    for (let i = 0; i < 100; i++) {
      // Create varied particles for nebula effect
      const purples = ['rgba(139, 92, 246, ', 'rgba(167, 139, 250, ', 'rgba(196, 181, 253, '];
      const blues = ['rgba(147, 197, 253, ', 'rgba(96, 165, 250, '];
      
      const colorPool = [...purples, ...blues];
      const color = colorPool[Math.floor(Math.random() * colorPool.length)];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.2,
        speedY: (Math.random() - 0.5) * 0.2,
        color: color,
        alpha: Math.random() * 0.5 + 0.1
      });
    }
    
    // Animation loop
    const animate = () => {
      // Create subtle gradient background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        // Move with subtle brownian motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Change direction randomly
        if (Math.random() < 0.01) {
          particle.speedX = (Math.random() - 0.5) * 0.2;
          particle.speedY = (Math.random() - 0.5) * 0.2;
        }
        
        // Ensure particles stay in bounds with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Pulsating size and opacity
        const pulse = Math.sin(Date.now() * 0.001 + particle.x * 0.01) * 0.2 + 0.8;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * pulse, 0, Math.PI * 2);
        ctx.fillStyle = particle.color + (particle.alpha * pulse) + ')';
        ctx.fill();
      }
      
      requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <div className="absolute bottom-0 w-full flex justify-center overflow-hidden">
      {/* Particle canvas background */}
      <canvas 
        ref={particleCanvasRef} 
        className="absolute inset-0 z-[-1]"
      />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-garden-purple/5 to-transparent z-[-1] animate-pulse-gentle" />
      <div className="absolute inset-0 bg-gradient-conic from-garden-blue/10 via-transparent to-garden-purple/10 z-[-1] animate-rotate-slow" />
      
      {/* Fallback color background if image isn't available */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-garden-green/30 to-transparent" />
      
      {/* Main silhouette with holographic effect */}
      <div className="relative h-[40vh] md:h-[50vh] w-full max-w-4xl silhouette-layer group">
        <img 
          src="/silhouette.png" 
          alt="Garden Silhouette" 
          className="h-full w-full object-contain object-bottom transition-all"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = 'none';
          }}
        />
        
        {/* Holographic portal effect */}
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">
          <div className="w-full h-[90%] bg-gradient-to-t from-garden-purple/20 via-garden-blue/10 to-transparent rounded-t-full backdrop-blur-[2px] animate-pulse-gentle"></div>
        </div>
        
        {/* Edge glow effect */}
        <div className="absolute inset-0 flex items-end justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
          <div className="w-[95%] h-[85%] border-t-2 border-l-2 border-r-2 border-purple-300/30 rounded-t-full blur-[2px] animate-pulse-gentle"></div>
        </div>
      </div>
      
      {/* Light effects */}
      <div className="absolute bottom-0 left-0 w-32 h-48 bg-garden-purple/10 blur-3xl rounded-full animate-pulse-gentle"></div>
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-garden-blue/10 blur-3xl rounded-full animate-pulse-gentle" style={{ animationDelay: '1s' }}></div>
    </div>
  );
};

export default SilhouetteBackground;
