
import React, { useState, useEffect } from "react";
import Header from "@/components/Landing/Header";
import HeroSection from "@/components/Landing/HeroSection";
import FeaturesSection from "@/components/Landing/FeaturesSection";
import HowItWorksSection from "@/components/Landing/HowItWorksSection";
import CallToAction from "@/components/Landing/CallToAction";
import Footer from "@/components/Landing/Footer";
import BackgroundEffects from "@/components/Landing/BackgroundEffects";

const LandingPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState("hero");
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      const sections = document.querySelectorAll("section[id]");
      
      sections.forEach((section) => {
        const sectionTop = (section as HTMLElement).offsetTop;
        const sectionHeight = (section as HTMLElement).offsetHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
          setActiveSection(section.getAttribute("id") || "");
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
      <BackgroundEffects />
      <Header activeSection={activeSection} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      {/* Pricing section removed */}
      <CallToAction />
      <Footer />
    </div>
  );
};

export default LandingPage;
