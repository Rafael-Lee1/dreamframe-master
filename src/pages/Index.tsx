
import React, { useEffect, useRef, useState } from "react";
import SilhouetteBackground from "@/components/SilhouetteBackground";
import OrbitingIcons from "@/components/OrbitingIcons";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Play } from "lucide-react";

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
      case "rest": return "bg-white dark:bg-garden-dark";
      case "medium": return "bg-gradient-to-b from-garden-purple/5 to-garden-blue/5";
      case "immersive": return "bg-gradient-to-b from-[#1a1033] to-[#0d1a3a]";
      default: return "bg-white dark:bg-garden-dark";
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
      <div className="absolute inset-0 backdrop-blur-[1px] transition-all duration-1000" />
      
      {/* Background gradient orbs - intensity changes with interaction level */}
      <div className={`absolute top-20 left-20 w-64 h-64 rounded-full bg-garden-purple/10 blur-3xl transition-all duration-1000 
        ${interactionLevel === "immersive" ? 'opacity-80 scale-125' : 'opacity-10'}`} />
      <div className={`absolute top-40 right-20 w-48 h-48 rounded-full bg-garden-blue/10 blur-3xl transition-all duration-1000
        ${interactionLevel === "immersive" ? 'opacity-80 scale-125' : 'opacity-10'}`} />
      
      {/* Header/Navigation */}
      <header className="absolute top-0 w-full flex justify-between items-center px-8 py-6 z-50">
        <div className="flex items-center">
          <h1 className="text-xl md:text-2xl font-light tracking-wide text-gray-800 dark:text-gray-100">
            Dream<span className="font-bold block -mt-1">MACHINE</span>
          </h1>
        </div>
        <nav className="hidden md:flex items-center gap-8">
          <a href="#" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Join Us</a>
          <a href="#" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Photon</a>
          <a href="#" className="text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white transition-colors">Ray2</a>
          <Button className="bg-black text-white hover:bg-gray-800 rounded-full px-6">Try Now</Button>
        </nav>
      </header>
      
      {/* Main content */}
      <main className="relative w-full h-full z-10 pt-32 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12">
          {/* Left column with heading and description */}
          <div className="flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800 dark:text-white">
              Make it real <span className="text-garden-neon">with AI</span>
            </h2>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg">
              A new fluid medium to create stunning images and videos that feel out of this world. All you need to do is ask.
            </p>
            
            <Button variant="outline" className="flex items-center gap-2 w-fit border-gray-300 text-gray-700 dark:border-gray-600 dark:text-gray-200">
              <Play className="h-4 w-4" />
              Watch launch video
            </Button>
            
            {/* Feature card */}
            <Card className="mt-12 bg-red-500 rounded-2xl overflow-hidden flex items-center max-w-lg">
              <div className="px-6 py-4 text-white">
                <p className="font-medium text-lg">Cinematic visuals for your film</p>
              </div>
              <div className="ml-auto bg-red-700 h-full p-4 flex items-center">
                <img src="/lovable-uploads/0691980d-996b-4b86-886d-c2a44e0987b2.png" alt="Cinematic example" className="h-16 w-16 object-cover rounded-lg" />
              </div>
            </Card>
          </div>
          
          {/* Right column with image */}
          <div className="relative aspect-square max-h-[500px] mt-6 md:mt-0">
            <div className="absolute inset-0 bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
              <img 
                src="/lovable-uploads/0691980d-996b-4b86-886d-c2a44e0987b2.png" 
                alt="AI Generated Character" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </main>
      
      {/* Background components */}
      <OrbitingIcons radius={getRadius()} />
      <SilhouetteBackground />
      
      {/* Interaction UI indicators */}
      <div className="absolute bottom-5 right-5 flex flex-col items-end gap-2 z-20">
        <HoverCard>
          <HoverCardTrigger asChild>
            <div className="bg-black/10 backdrop-blur-md px-3 py-1 rounded-full text-xs text-gray-700 dark:text-white/80 border border-white/10 cursor-help">
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
