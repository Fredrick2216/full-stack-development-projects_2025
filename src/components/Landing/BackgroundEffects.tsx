
import React from "react";

const BackgroundEffects: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0">
      <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-space-purple/10 rounded-full blur-3xl animate-blob"></div>
      <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      <div aria-hidden="true" className="absolute top-1/2 left-1/2 w-96 h-96 bg-space-purple/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
    </div>
  );
};

export default BackgroundEffects;
