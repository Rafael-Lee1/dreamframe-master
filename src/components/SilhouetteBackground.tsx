
import React from "react";

const SilhouetteBackground: React.FC = () => {
  return (
    <div className="absolute bottom-0 w-full flex justify-center overflow-hidden">
      {/* Fallback color background if image isn't available */}
      <div className="absolute bottom-0 w-full h-48 bg-gradient-to-t from-garden-green/30 to-transparent" />
      
      {/* Main silhouette */}
      <div className="relative h-[40vh] md:h-[50vh] w-full max-w-4xl silhouette-layer">
        <img 
          src="/silhouette.png" 
          alt="Garden Silhouette" 
          className="h-full w-full object-contain object-bottom"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.onerror = null;
            target.style.display = 'none';
          }}
        />
      </div>
      
      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-32 h-48 bg-garden-purple/10 blur-3xl rounded-full" />
      <div className="absolute bottom-10 right-10 w-24 h-24 bg-garden-blue/10 blur-3xl rounded-full" />
    </div>
  );
};

export default SilhouetteBackground;
