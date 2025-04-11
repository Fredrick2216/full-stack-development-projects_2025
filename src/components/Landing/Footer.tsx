
import React from "react";
import { motion } from "framer-motion";
import { PiggyBank } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-border py-12 relative z-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <motion.div 
            className="flex items-center gap-2 mb-4 md:mb-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="h-8 w-8 bg-space-purple rounded-lg flex items-center justify-center">
              <PiggyBank className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">
              Budget Savvy
            </span>
          </motion.div>
          
          <motion.div 
            className="flex flex-wrap justify-center md:justify-end gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {["Features", "Pricing", "Blog", "Support", "Terms", "Privacy"].map((item, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="text-muted-foreground hover:text-space-purple transition-colors"
                whileHover={{ y: -2 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
        
        <div className="pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Budget Savvy. All rights reserved.
          </p>
          <div className="flex gap-4">
            {["Twitter", "LinkedIn", "Facebook", "Instagram"].map((social, i) => (
              <motion.a 
                key={i} 
                href="#" 
                className="text-muted-foreground hover:text-space-purple transition-colors text-sm"
                whileHover={{ y: -2 }}
              >
                {social}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
