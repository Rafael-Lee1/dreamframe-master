
import React from "react";
import SilhouetteBackground from "@/components/SilhouetteBackground";
import OrbitingIcons from "@/components/OrbitingIcons";
import CenterElement from "@/components/CenterElement";

const Index: React.FC = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-garden-gradient">
      <div className="absolute inset-0 bg-garden-accent/5 backdrop-blur-[1px]" />
      
      {/* Background gradient orbs */}
      <div className="absolute top-20 left-20 w-64 h-64 rounded-full bg-garden-purple/20 blur-3xl" />
      <div className="absolute top-40 right-20 w-48 h-48 rounded-full bg-garden-blue/20 blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-72 h-72 rounded-full bg-garden-green/20 blur-3xl" />
      
      {/* Main components */}
      <OrbitingIcons radius={180} />
      <CenterElement />
      <SilhouetteBackground />
    </div>
  );
};

export default Index;
