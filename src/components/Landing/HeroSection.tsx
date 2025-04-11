
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeroSection: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Navigate to register");
    navigate("/auth", { state: { defaultTab: "register" } });
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="hero" className="relative z-10 pt-20 pb-32">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.h2 
              className="text-4xl md:text-5xl xl:text-6xl font-bold leading-tight"
              variants={fadeIn}
            >
              Master Your Finances with <span className="bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">Budget Savvy</span>
            </motion.h2>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground"
              variants={fadeIn}
            >
              Take control of your financial journey with our intelligent expense tracking and budgeting tools. Start building your wealth today.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 pt-6"
              variants={fadeIn}
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  onClick={handleGetStarted}
                  className="w-full sm:w-auto bg-space-purple hover:bg-space-purple/90 text-lg px-8 py-6 h-auto"
                >
                  Start For Free <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="w-full lg:w-1/2 relative"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-space-purple/20 to-accent/20 rounded-xl blur-xl"></div>
              <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-muted/50 p-3 border-b border-border flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-3 w-3 rounded-full bg-red-500"></div>
                    <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-4 py-1 rounded-full bg-background/50 text-xs">budgetsavvy.app</div>
                  </div>
                </div>
                
                <div className="bg-card/30 backdrop-blur-sm p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="space-y-1">
                      <h3 className="font-medium text-sm">Dashboard Overview</h3>
                      <p className="text-xs text-muted-foreground">April 2025</p>
                    </div>
                    <div className="space-x-2">
                      <span className="inline-block w-16 h-6 bg-muted rounded-md"></span>
                      <span className="inline-block w-16 h-6 bg-space-purple/30 rounded-md"></span>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <motion.div 
                      className="bg-background/60 backdrop-blur-md rounded-lg p-4 col-span-2"
                      whileHover={{ y: -5 }}
                    >
                      <div className="h-2.5 w-20 bg-muted rounded mb-3"></div>
                      <div className="flex items-end h-32 gap-1">
                        <motion.div 
                          className="h-[45%] w-8 rounded-t-md bg-space-purple/60"
                          initial={{ height: '0%' }}
                          animate={{ height: '45%' }}
                          transition={{ delay: 0.5, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[65%] w-8 rounded-t-md bg-space-purple/70"
                          initial={{ height: '0%' }}
                          animate={{ height: '65%' }}
                          transition={{ delay: 0.6, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[35%] w-8 rounded-t-md bg-space-purple/60"
                          initial={{ height: '0%' }}
                          animate={{ height: '35%' }}
                          transition={{ delay: 0.7, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[80%] w-8 rounded-t-md bg-accent/70"
                          initial={{ height: '0%' }}
                          animate={{ height: '80%' }}
                          transition={{ delay: 0.8, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[60%] w-8 rounded-t-md bg-space-purple/70"
                          initial={{ height: '0%' }}
                          animate={{ height: '60%' }}
                          transition={{ delay: 0.9, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[50%] w-8 rounded-t-md bg-space-purple/60"
                          initial={{ height: '0%' }}
                          animate={{ height: '50%' }}
                          transition={{ delay: 1.0, duration: 1 }}
                        ></motion.div>
                        <motion.div 
                          className="h-[72%] w-8 rounded-t-md bg-space-purple/70"
                          initial={{ height: '0%' }}
                          animate={{ height: '72%' }}
                          transition={{ delay: 1.1, duration: 1 }}
                        ></motion.div>
                      </div>
                    </motion.div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <motion.div 
                      className="bg-background/60 backdrop-blur-md rounded-lg p-4"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-8 rounded-full bg-space-purple/20 flex items-center justify-center">
                          <div className="h-4 w-4 bg-space-purple rounded-full"></div>
                        </div>
                        <div className="h-2 w-10 bg-muted rounded"></div>
                      </div>
                      <div className="mt-3 h-2.5 w-14 bg-muted rounded"></div>
                      <div className="mt-2 h-4 w-20 bg-space-purple/30 rounded"></div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 backdrop-blur-md rounded-lg p-4"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-8 rounded-full bg-accent/20 flex items-center justify-center">
                          <div className="h-4 w-4 bg-accent rounded-full"></div>
                        </div>
                        <div className="h-2 w-10 bg-muted rounded"></div>
                      </div>
                      <div className="mt-3 h-2.5 w-14 bg-muted rounded"></div>
                      <div className="mt-2 h-4 w-16 bg-accent/30 rounded"></div>
                    </motion.div>
                    
                    <motion.div 
                      className="bg-background/60 backdrop-blur-md rounded-lg p-4"
                      whileHover={{ y: -3 }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="h-8 w-8 rounded-full bg-green-500/20 flex items-center justify-center">
                          <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                        </div>
                        <div className="h-2 w-10 bg-muted rounded"></div>
                      </div>
                      <div className="mt-3 h-2.5 w-14 bg-muted rounded"></div>
                      <div className="mt-2 h-4 w-12 bg-green-500/30 rounded"></div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
