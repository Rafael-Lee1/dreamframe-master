
import React from "react";

interface CenterElementProps {
  title?: string;
  subtitle?: string;
}

const CenterElement: React.FC<CenterElementProps> = ({ 
  title = "Jardim Digital", 
  subtitle = "Um espaço tranquilo para contemplação"
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center z-10 px-6">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-garden-accent animate-pulse-gentle mb-3">
          {title}
        </h1>
        <p className="text-lg md:text-xl opacity-80 max-w-md mx-auto">
          {subtitle}
        </p>
        
        {/* Decorative circle */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 md:w-64 md:h-64 rounded-full bg-gradient-to-br from-garden-purple/10 to-garden-blue/5 -z-10 animate-rotate-slow" />
        
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 md:w-96 md:h-96 opacity-50 bg-glow-purple -z-20" />
      </div>
    </div>
  );
};

export default CenterElement;
