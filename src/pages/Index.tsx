
import React, { useState, useEffect } from "react";
import SilhouetteBackground from "@/components/SilhouetteBackground";
import OrbitingIcons from "@/components/OrbitingIcons";
import DreamHeader from "@/components/DreamHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Index: React.FC = () => {
  const [orbitRadius] = useState<number>(220);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f9f9f9]">
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      
      {/* Header */}
      <header className="absolute top-0 left-0 w-full p-6 z-20">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <span className="text-xl font-medium text-[#111111]">Dream Machine</span>
          </div>
          <div className="flex items-center space-x-6">
            <a href="#" className="text-sm text-[#333333] hover:text-black transition-colors">Join waitlist</a>
            <a href="#" className="text-sm text-[#333333] hover:text-black transition-colors">Log in</a>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="relative w-full h-full z-10 flex flex-col justify-center items-center">
        <div className={`text-center px-4 md:px-6 transition-opacity duration-1000 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#111111] mb-6 tracking-tight">
            Dream Machine
          </h1>
          <p className="text-lg md:text-xl text-[#333333] max-w-lg mx-auto mb-8">
            Generate stunning, cinematic 3D scenes from text in seconds
          </p>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button className="bg-black text-white hover:bg-[#222222] px-6 py-6 rounded-full text-lg font-medium transition-all duration-300 flex items-center">
              Try Dream Machine
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
          
          <div className="mt-12 px-4 md:mt-16">
            <div className="relative rounded-2xl overflow-hidden w-full max-w-4xl mx-auto shadow-lg border border-gray-100">
              <img 
                src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5" 
                alt="Dream Machine Example" 
                className="w-full h-auto"
              />
              <div className="absolute bottom-4 left-4 text-xs text-white bg-black/50 px-2 py-1 rounded-md">
                Generated with Dream Machine
              </div>
            </div>
          </div>
        </div>
      </main>
      
      {/* Background components */}
      <OrbitingIcons radius={orbitRadius} />
      <SilhouetteBackground />
    </div>
  );
};

export default Index;
