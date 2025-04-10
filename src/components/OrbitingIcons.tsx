
import React, { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const icons = [
  "/icons/icon1.svg",
  "/icons/icon2.svg", 
  "/icons/icon3.svg",
  "/icons/icon4.svg",
  "/icons/icon5.svg"
];

// Fallback icons in case the SVGs aren't available
const fallbackIcons = [
  "🌿", "🌱", "🍃", "🌸", "🌺"
];

interface OrbitingIconProps {
  radius?: number;
}

const OrbitingIcons: React.FC<OrbitingIconProps> = ({ radius = 150 }) => {
  const [angle, setAngle] = useState(0);
  const [useEmojis, setUseEmojis] = useState(false);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [clickIndex, setClickIndex] = useState<number | null>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Adjust radius for mobile screens
  const adjustedRadius = isMobile ? radius * 0.6 : radius;

  // Track mouse position for interactive effects
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Test if SVGs are available
    const img = new Image();
    img.src = icons[0];
    img.onerror = () => setUseEmojis(true);

    // Orbit animation
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.005); // Slower, more elegant motion
    }, 16);
    
    // Mouse position tracking for interactive effects
    const handleMouseMove = (e: MouseEvent) => {
      if (!orbitRef.current) return;
      const rect = orbitRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left - rect.width / 2,
        y: e.clientY - rect.top - rect.height / 2
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Reset click effect after animation completes
  useEffect(() => {
    if (clickIndex !== null) {
      const timer = setTimeout(() => setClickIndex(null), 800);
      return () => clearTimeout(timer);
    }
  }, [clickIndex]);

  // Calculate connection lines between orbiting elements
  const getConnectionPoints = () => {
    if (useEmojis) return null;
    
    const points = icons.map((_, index) => {
      const theta = angle + (index * (2 * Math.PI / icons.length));
      const x = adjustedRadius * Math.cos(theta);
      const y = adjustedRadius * Math.sin(theta);
      return { x, y, index };
    });
    
    return points.map((point, i) => {
      const nextPoint = points[(i + 1) % points.length];
      const distance = Math.sqrt(
        Math.pow(nextPoint.x - point.x, 2) + 
        Math.pow(nextPoint.y - point.y, 2)
      );
      
      // Only connect if they're not too far apart
      if (distance < adjustedRadius * 1.5) {
        const opacity = 1 - (distance / (adjustedRadius * 1.5));
        return (
          <line
            key={`connection-${i}`}
            x1={point.x + adjustedRadius}
            y1={point.y + adjustedRadius}
            x2={nextPoint.x + adjustedRadius}
            y2={nextPoint.y + adjustedRadius}
            stroke={`rgba(139, 92, 246, ${opacity * 0.3})`}
            strokeWidth="1"
            strokeDasharray="3 3"
            className="connection-line"
          />
        );
      }
      return null;
    });
  };

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div ref={orbitRef} className="relative w-full h-full max-w-screen-lg mx-auto">
        {/* Connection lines SVG overlay */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none">
          <g transform={`translate(${adjustedRadius}, ${adjustedRadius})`}>
            {getConnectionPoints()}
          </g>
        </svg>
        
        {/* Orbiting elements */}
        {(useEmojis ? fallbackIcons : icons).map((icon, index) => {
          const theta = angle + (index * (2 * Math.PI / icons.length));
          // Add a small oscillation to each planet's orbit for more organic motion
          const oscillation = Math.sin(angle * 3 + index) * 15;
          const orbitRadiusX = adjustedRadius + oscillation;
          const orbitRadiusY = adjustedRadius - oscillation/2;
          
          const x = orbitRadiusX * Math.cos(theta);
          const y = orbitRadiusY * Math.sin(theta);
          
          const isHovered = hoverIndex === index;
          const isClicked = clickIndex === index;
          
          return useEmojis ? (
            <div
              key={`icon-${index}`}
              className={`absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-auto cursor-pointer 
                ${isHovered ? 'scale-150 z-10' : 'scale-100'} 
                ${isClicked ? 'animate-pulse-fast' : ''}`}
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                animationDelay: `${index * 0.7}s`,
                filter: `drop-shadow(0 0 ${isHovered ? '12px' : '6px'} rgba(139, 92, 246, ${isHovered ? '0.8' : '0.4'}))`
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setClickIndex(index)}
            >
              {icon}
              
              {/* Ripple effect on hover */}
              {isHovered && (
                <div className="absolute inset-0 -z-10 animate-ripple rounded-full border border-purple-400" />
              )}
              
              {/* Click explosion effect */}
              {isClicked && (
                <div className="absolute inset-0 -z-10 animate-explosion rounded-full bg-garden-purple/30" />
              )}
            </div>
          ) : (
            <div
              key={`icon-${index}`}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 pointer-events-auto cursor-pointer 
                ${isHovered ? 'scale-150 z-10' : 'scale-100'}
                ${isClicked ? 'animate-pulse-fast' : ''}`}
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                animationDelay: `${index * 0.7}s`,
              }}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(null)}
              onClick={() => setClickIndex(index)}
            >
              <img
                src={icon}
                alt={`Garden element ${index + 1}`}
                className={`w-12 h-12 transform animate-float icon-glow transition-all duration-300
                  ${isHovered ? 'rotate-[360deg] duration-[2000ms]' : ''}`}
                style={{
                  filter: `drop-shadow(0 0 ${isHovered ? '12px' : '6px'} rgba(139, 92, 246, ${isHovered ? '0.8' : '0.4'}))`
                }}
              />
              
              {/* Atmospheric ring on hover */}
              {isHovered && (
                <>
                  <div className="absolute inset-0 -z-10 w-full h-full rounded-full animate-ripple border border-purple-400" />
                  <div className="absolute inset-0 -z-10 w-full h-full rounded-full animate-ripple-delayed border border-purple-300 opacity-70" />
                </>
              )}
              
              {/* Click explosion effect */}
              {isClicked && (
                <div className="absolute inset-0 -z-10 w-full h-full rounded-full animate-explosion bg-garden-purple/30" />
              )}
              
              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs rounded whitespace-nowrap animate-fade-up z-20">
                  Element {index + 1}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingIcons;
