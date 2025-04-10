
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
    
    for (let i = 0; i < 30; i++) {
      const gray = Math.floor(Math.random() * 20) + 230; // Light gray particles
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.05,
        speedY: (Math.random() - 0.5) * 0.05,
        alpha: Math.random() * 0.2 + 0.1
      });
    }
    
    // Animation loop
    const animate = () => {
      // Create light gray background
      ctx.fillStyle = '#e5e5e5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (const particle of particles) {
        // Move with subtle brownian motion
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // Change direction randomly
        if (Math.random() < 0.01) {
          particle.speedX = (Math.random() - 0.5) * 0.05;
          particle.speedY = (Math.random() - 0.5) * 0.05;
        }
        
        // Ensure particles stay in bounds with wrapping
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 180, 180, ${particle.alpha})`;
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
      
      {/* Human silhouette */}
      <div className="absolute bottom-0 w-full flex justify-center">
        <div className="relative w-full max-w-sm h-[40vh]">
          <div className="absolute bottom-0 w-full h-full">
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
