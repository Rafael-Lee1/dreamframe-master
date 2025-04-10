
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
    
    for (let i = 0; i < 60; i++) {
      // Create subtle particles
      const grays = ['rgba(220, 220, 225, ', 'rgba(200, 200, 210, ', 'rgba(180, 180, 190, '];
      const purples = ['rgba(139, 92, 246, ', 'rgba(167, 139, 250, '];
      
      const colorPool = [...grays, ...purples];
      const color = colorPool[Math.floor(Math.random() * colorPool.length)];
      
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.1,
        speedY: (Math.random() - 0.5) * 0.1,
        color: color,
        alpha: Math.random() * 0.3 + 0.05
      });
    }
    
    // Animation loop
    const animate = () => {
      // Create subtle background
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        // Move with subtle brownian motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Change direction randomly
        if (Math.random() < 0.01) {
          particle.speedX = (Math.random() - 0.5) * 0.1;
          particle.speedY = (Math.random() - 0.5) * 0.1;
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
    <div className="absolute bottom-0 w-full flex justify-center overflow-hidden z-0">
      {/* Particle canvas background */}
      <canvas 
        ref={particleCanvasRef} 
        className="absolute inset-0 z-[-1]"
      />
      
      {/* Animated gradient overlays */}
      <div className="absolute inset-0 bg-gradient-radial from-garden-purple/5 to-transparent z-[-1] animate-pulse-gentle" />
      
      {/* Human silhouette */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="relative w-full max-w-sm h-[40vh]">
          <div className="absolute bottom-0 w-full h-full bg-black">
            <svg viewBox="0 0 100 100" className="absolute bottom-0 w-full h-full">
              <defs>
                <mask id="silhouetteMask">
                  <rect width="100" height="100" fill="white" />
                  <path d="M50,30 C55,10 45,10 50,30 Q55,50 50,60 Q45,50 50,30 Z" fill="black"/>
                  <path d="M40,100 L60,100 L55,60 Q50,50 45,60 L40,100 Z" fill="black"/>
                </mask>
              </defs>
              <rect width="100" height="100" fill="black" mask="url(#silhouetteMask)" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilhouetteBackground;
