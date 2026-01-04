
import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 z-[200] bg-white flex flex-col items-center justify-center transition-opacity duration-1000">
      <div className="overflow-hidden">
        <h1 className="text-8xl md:text-[12rem] font-black tracking-[-0.1em] animate-pulse">
          ZARA
        </h1>
      </div>
      <div className="mt-8 w-48 h-[1px] bg-gray-100 relative overflow-hidden">
        <div className="absolute inset-0 bg-black animate-[loading_2s_ease-in-out_infinite]" />
      </div>
      <style>{`
        @keyframes loading {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
