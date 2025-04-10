
import React from "react";
import { Button } from "@/components/ui/button";

const DreamHeader: React.FC = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-4 py-6">
      <div className="container mx-auto flex justify-between items-center">
        <div className="font-bold text-2xl text-[#111111]">Luma</div>
        <nav className="hidden md:flex space-x-8 text-sm">
          <a href="#" className="text-[#333333] hover:text-black">Products</a>
          <a href="#" className="text-[#333333] hover:text-black">Research</a>
          <a href="#" className="text-[#333333] hover:text-black">About</a>
          <a href="#" className="text-[#333333] hover:text-black">Blog</a>
        </nav>
        <div className="flex items-center space-x-4">
          <Button variant="ghost" className="text-sm font-medium hidden md:block">
            Sign In
          </Button>
          <Button className="bg-black text-white hover:bg-[#222222] rounded-full text-sm font-medium px-4 py-2">
            Try Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DreamHeader;
