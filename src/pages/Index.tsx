
import React, { useState } from "react";
import SilhouetteBackground from "@/components/SilhouetteBackground";
import OrbitingIcons from "@/components/OrbitingIcons";
import CenterElement from "@/components/CenterElement";

const Index: React.FC = () => {
  const [orbitRadius] = useState<number>(220);

  return (
    <div
      className="relative h-screen w-full overflow-hidden bg-[#e5e5e5]"
    >
      <div className="absolute inset-0 backdrop-blur-[1px]" />
      
      {/* Main content */}
      <main className="relative w-full h-full z-10">
        <CenterElement />
      </main>
      
      {/* Background components */}
      <OrbitingIcons radius={orbitRadius} />
      <SilhouetteBackground />
    </div>
  );
};

export default Index;
