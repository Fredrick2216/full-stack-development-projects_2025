
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { PiggyBank } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  activeSection: string;
}

const Header: React.FC<HeaderProps> = ({ activeSection }) => {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/auth", { state: { defaultTab: "register", forceShowForm: true } });
  };
  
  const handleLogin = () => {
    navigate("/auth", { state: { defaultTab: "login", forceShowForm: true } });
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-sm bg-background/80 border-b border-border/40 transition-all duration-200">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-space-purple/30 rounded-lg blur-md"></div>
            <div className="relative h-10 w-10 bg-space-purple rounded-lg flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">
            Budget Savvy
          </h1>
        </motion.div>
        
        <motion.nav 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="hidden md:flex items-center gap-8"
        >
          {["Features", "How It Works", "Pricing"].map((item, index) => (
            <motion.a
              key={index}
              href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              className={`text-sm font-medium relative after:content-[''] after:absolute after:w-full after:h-0.5 after:bg-space-purple after:left-0 after:bottom-0 after:scale-x-0 after:origin-left after:transition-transform hover:after:scale-x-100 ${
                activeSection === item.toLowerCase().replace(/\s+/g, '-') ? "text-space-purple after:scale-x-100" : "text-muted-foreground"
              }`}
              whileHover={{ y: -2 }}
            >
              {item}
            </motion.a>
          ))}
        </motion.nav>
        
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="hover:text-space-purple transition-colors"
            >
              Login
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={handleGetStarted}
              className="bg-space-purple hover:bg-space-purple/90"
            >
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </header>
  );
};

export default Header;
