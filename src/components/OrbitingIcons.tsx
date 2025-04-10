
import React, { useEffect, useState, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

// Simple clean icons for the orbit
const icons = [
  "/icons/icon1.svg",
  "/icons/icon2.svg", 
  "/icons/icon3.svg",
  "/icons/icon4.svg",
  "/icons/icon5.svg"
];

// Fallback icons in case the SVGs aren't available
const fallbackIcons = [
  "○", "●", "◆", "□", "★"
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

    // Orbit animation with very slow, subtle movement
    const interval = setInterval(() => {
      setAngle((prev) => prev + 0.0015);
    }, 16);
    
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      <div ref={orbitRef} className="relative w-full h-full max-w-screen-lg mx-auto">
        {/* Connection lines (very subtle) */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.02]">
          {(useEmojis ? fallbackIcons : icons).map((_, index) => {
            const nextIndex = (index + 1) % icons.length;
            const theta1 = angle + (index * (2 * Math.PI / icons.length));
            const theta2 = angle + (nextIndex * (2 * Math.PI / icons.length));
            const x1 = adjustedRadius * Math.cos(theta1);
            const y1 = adjustedRadius * Math.sin(theta1) * 0.25; // Make more elliptical
            const x2 = adjustedRadius * Math.cos(theta2);
            const y2 = adjustedRadius * Math.sin(theta2) * 0.25; // Make more elliptical
            
            return (
              <line
                key={`line-${index}`}
                x1={`calc(50% + ${x1}px)`}
                y1={`calc(50% + ${y1}px)`}
                x2={`calc(50% + ${x2}px)`}
                y2={`calc(50% + ${y2}px)`}
                stroke="#000"
                strokeWidth="0.5"
                className="connection-line"
              />
            );
          })}
        </svg>

        {/* Orbiting elements */}
        {(useEmojis ? fallbackIcons : icons).map((icon, index) => {
          const theta = angle + (index * (2 * Math.PI / icons.length));
          // Use a significantly flattened elliptical orbit - almost horizontal
          const x = adjustedRadius * Math.cos(theta);
          const y = adjustedRadius * Math.sin(theta) * 0.25; // Flatten the circle to make it more elliptical
          
          return useEmojis ? (
            <div
              key={`icon-${index}`}
              className="absolute text-lg transform -translate-x-1/2 -translate-y-1/2 opacity-40 transition-all duration-300"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
              }}
            >
              {icon}
            </div>
          ) : (
            <div
              key={`icon-${index}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
              style={{ 
                left: `calc(50% + ${x}px)`, 
                top: `calc(50% + ${y}px)`,
              }}
            >
              <img
                src={icon}
                alt={`Element ${index + 1}`}
                className="w-4 h-4 transform opacity-40"
                style={{
                  filter: 'brightness(0) opacity(0.4)'
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
