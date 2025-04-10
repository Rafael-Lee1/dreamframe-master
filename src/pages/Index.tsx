
import React, { useEffect, useRef, useState } from "react";
import SilhouetteBackground from "@/components/SilhouetteBackground";
import OrbitingIcons from "@/components/OrbitingIcons";
import CenterElement from "@/components/CenterElement";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";

const Index: React.FC = () => {
  // Interactivity state
  const [interactionLevel, setInteractionLevel] = useState<"rest" | "medium" | "immersive">("rest");
  const [orbitSpeed, setOrbitSpeed] = useState<number>(1);
  const mainRef = useRef<HTMLDivElement>(null);
  
  // Handle scroll interaction
  useEffect(() => {
    const handleScroll = (e: WheelEvent) => {
      e.preventDefault();
      
      // Update orbit speed based on scroll
      const newSpeed = Math.min(Math.max(orbitSpeed + e.deltaY * 0.001, 0.5), 2);
      setOrbitSpeed(newSpeed);
      
      // Determine interaction level based on speed
      if (newSpeed < 0.7) setInteractionLevel("rest");
      else if (newSpeed > 1.5) setInteractionLevel("immersive");
      else setInteractionLevel("medium");
    };
    
    const main = mainRef.current;
    if (main) {
      main.addEventListener('wheel', handleScroll, { passive: false });
    }
    
    return () => {
      if (main) {
        main.removeEventListener('wheel', handleScroll);
      }
    };
  }, [orbitSpeed]);
  
  // Get background class based on interaction level
  const getBackgroundClass = () => {
    switch (interactionLevel) {
      case "rest": return "bg-garden-gradient";
      case "medium": return "bg-gradient-to-b from-garden-purple/20 to-garden-blue/20";
      case "immersive": return "bg-gradient-to-b from-[#1a1033] to-[#0d1a3a]";
      default: return "bg-garden-gradient";
    }
  };
  
  // Calculate radius based on interaction level
  const getRadius = () => {
    switch (interactionLevel) {
      case "rest": return 150;
      case "medium": return 180;
      case "immersive": return 220;
      default: return 150;
    }
  };

  return (
    <div
      ref={mainRef}
      className={`relative h-screen w-full overflow-hidden transition-colors duration-1000 ${getBackgroundClass()}`}
    >
      <div className={`absolute inset-0 backdrop-blur-[${interactionLevel === "immersive" ? 2 : 1}px] transition-all duration-1000`} />
      
      {/* Background gradient orbs - intensity changes with interaction level */}
      <div className={`absolute top-20 left-20 w-64 h-64 rounded-full bg-garden-purple/20 blur-3xl transition-all duration-1000 
        ${interactionLevel === "immersive" ? 'opacity-80 scale-125' : 'opacity-20'}`} />
      <div className={`absolute top-40 right-20 w-48 h-48 rounded-full bg-garden-blue/20 blur-3xl transition-all duration-1000
        ${interactionLevel === "immersive" ? 'opacity-80 scale-125' : 'opacity-20'}`} />
      <div className={`absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-garden-green/20 blur-3xl transition-all duration-1000
        ${interactionLevel === "immersive" ? 'opacity-60 scale-125' : 'opacity-20'}`} />
      
      {/* Main components */}
      <OrbitingIcons radius={getRadius()} />
      <CenterElement />
      <SilhouetteBackground />
      
      {/* Interaction UI indicators */}
      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-white/80 border border-white/10 cursor-help">
              {interactionLevel === "rest" ? "Calm" : 
               interactionLevel === "medium" ? "Engaged" : "Immersive"}
            </div>
          </HoverCardTrigger>
          <HoverCardContent className="bg-black/50 backdrop-blur-md border-white/10 text-white w-64">
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Interaction Controls</h4>
              <div className="text-xs space-y-1">
                <p>• Scroll to adjust system speed</p>
                <p>• Hover over elements for details</p>
                <p>• Click elements to trigger effects</p>
              </div>
              <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-garden-purple transition-all duration-300"
                  style={{ width: `${(orbitSpeed / 2) * 100}%` }}
                ></div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>
      </div>
    </div>
  );
};

export default Index;
