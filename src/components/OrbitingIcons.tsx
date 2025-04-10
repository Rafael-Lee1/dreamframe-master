
import React, { useEffect, useState } from "react";
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
  const isMobile = useIsMobile();
  
  // Adjust radius for mobile screens
  const adjustedRadius = isMobile ? radius * 0.6 : radius;

  useEffect(() => {
    // Test if SVGs are available
    const img = new Image();
    img.src = icons[0];
    img.onerror = () => setUseEmojis(true);

    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.01);
    }, 16);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div className="relative w-full h-full max-w-screen-lg mx-auto">
        {(useEmojis ? fallbackIcons : icons).map((icon, index) => {
          const theta = angle + (index * (2 * Math.PI / icons.length));
          const x = adjustedRadius * Math.cos(theta);
          const y = adjustedRadius * Math.sin(theta);
          
          return useEmojis ? (
            <div
              key={`icon-${index}`}
              className="absolute text-3xl transform -translate-x-1/2 -translate-y-1/2 animate-float icon-glow"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                animationDelay: `${index * 0.7}s`
              }}
            >
              {icon}
            </div>
          ) : (
            <img
              key={`icon-${index}`}
              src={icon}
              alt={`Garden element ${index + 1}`}
              className="absolute w-12 h-12 transform -translate-x-1/2 -translate-y-1/2 animate-float icon-glow"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                animationDelay: `${index * 0.7}s`
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingIcons;
