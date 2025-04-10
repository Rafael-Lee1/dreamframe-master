
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
    
    // Create minimal particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      alpha: number;
    }[] = [];
    
    for (let i = 0; i < 80; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.3,
        speedX: (Math.random() - 0.5) * 0.08,
        speedY: (Math.random() - 0.5) * 0.08,
        alpha: Math.random() * 0.08 + 0.02
      });
    }
    
    // Animation loop
    const animate = () => {
      // Create very light background
      ctx.fillStyle = '#f9f9f9';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        // Move with subtle brownian motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Change direction randomly
        if (Math.random() < 0.01) {
          particle.speedX = (Math.random() - 0.5) * 0.08;
          particle.speedY = (Math.random() - 0.5) * 0.08;
        }
        
        // Ensure particles stay in bounds with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(100, 100, 100, ${particle.alpha})`;
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
      
      {/* Very subtle silhouette at bottom */}
      <div className="absolute bottom-0 w-full flex justify-center opacity-[0.02]">
        <div className="relative w-full max-w-6xl h-[20vh]">
          <div className="absolute bottom-0 w-full h-full">
            <svg viewBox="0 0 100 30" className="absolute bottom-0 w-full h-full">
              <path d="M0,30 L100,30 L100,15 C80,10 70,18 50,12 C30,6 20,16 0,10 L0,30 Z" fill="black" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SilhouetteBackground;
