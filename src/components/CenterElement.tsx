
import React from "react";

interface CenterElementProps {
  title?: string;
  subtitle?: string;
  hidden?: boolean;
}

const CenterElement: React.FC<CenterElementProps> = ({ 
  title = "Gorgeous visuals for fashion", 
  subtitle = "",
  hidden = false
}) => {
  if (hidden) return null;
  
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div className="text-center z-10 px-6 py-3 rounded-full bg-white shadow-md">
        <h1 className="text-lg md:text-xl lg:text-2xl font-medium text-gray-800">
          {title}
        </h1>
        {subtitle && (
          <p className="text-sm md:text-base opacity-80 max-w-md mx-auto">
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
};

export default CenterElement;
