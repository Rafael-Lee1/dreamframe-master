
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
  "🌕", "🔵", "⚫", "⚪", "✨"
];

interface OrbitingIconProps {
  radius?: number;
}

const OrbitingIcons: React.FC<OrbitingIconProps> = ({ radius = 150 }) => {
  const [angle, setAngle] = useState(0);
  const [useEmojis, setUseEmojis] = useState(false);
  const orbitRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();
  
  // Adjust radius for mobile screens
  const adjustedRadius = isMobile ? radius * 0.6 : radius;

  useEffect(() => {
    // Test if SVGs are available
    const img = new Image();
    img.src = icons[0];
    img.onerror = () => setUseEmojis(true);

    // Orbit animation
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.005);
    }, 16);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div ref={orbitRef} className="relative w-full h-full max-w-screen-lg mx-auto">
        {/* Orbiting elements */}
        {(useEmojis ? fallbackIcons : icons).map((icon, index) => {
          const theta = angle + (index * (2 * Math.PI / icons.length));
          // Use a simple horizontal line as orbit for the main showcase
          const x = adjustedRadius * Math.cos(theta);
          const y = 0; // Keep y at 0 to make a horizontal line
          
          return useEmojis ? (
            <div
              key={`icon-${index}`}
              className="absolute text-3xl transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
                opacity: 0.8
              }}
            >
              {icon}
            </div>
          ) : (
            <div
              key={`icon-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
              }}
            >
              <img
                src={icon}
                alt={`Element ${index + 1}`}
                className="w-6 h-6 transform"
                style={{
                  filter: index === 1 ? 'brightness(0) invert(42%) sepia(93%) saturate(1352%) hue-rotate(230deg) brightness(119%) contrast(119%)' : 
                          (index === 0 ? 'brightness(0) invert(80%) sepia(42%) saturate(397%) hue-rotate(356deg) brightness(103%) contrast(101%)' : 
                          'brightness(0)')
                }}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrbitingIcons;
