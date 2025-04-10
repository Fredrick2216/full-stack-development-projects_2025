
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, PiggyBank, TrendingUp, Shield, CheckCircle, ChevronDown } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeFeature, setActiveFeature] = useState(0);
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  
  // Handle scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: "Smart Expense Tracking",
      description: "Easily log your expenses on the go. Categorize, tag, and add notes to keep everything organized.",
      icon: <TrendingUp className="h-10 w-10 text-accent" />
    },
    {
      title: "Insightful Analytics",
      description: "Gain deep insights into your spending habits through beautiful charts and visual breakdowns.",
      icon: <BarChart2 className="h-10 w-10 text-space-purple" />
    },
    {
      title: "Secure & Private",
      description: "Your financial data stays private with advanced encryption and strict privacy controls.",
      icon: <Shield className="h-10 w-10 text-green-500" />
    }
  ];

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };
  
  const handleGetStarted = () => {
    navigate("/auth", { state: { defaultTab: "register" } });
  };
  
  const handleLogin = () => {
    navigate("/auth", { state: { defaultTab: "login" } });
  };
  
  const scrollToFeatures = () => {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sidebar-background overflow-hidden relative">
      {/* Abstract animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-space-purple/20 blur-3xl -top-64 -left-64 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl top-1/2 -right-64 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-space-purple/10 blur-3xl -bottom-64 left-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header - with scroll animation */}
        <motion.header 
          className="flex justify-between items-center mb-20 sticky top-0 z-20 py-4 backdrop-blur-sm bg-background/70"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center gap-2">
            <motion.div 
              className="h-10 w-10 bg-space-purple rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <PiggyBank className="h-6 w-6 text-white" />
            </motion.div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">
              Budget Savvy
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={handleLogin}
              className="hover:text-space-purple hover:scale-105 transition-all"
              whileHover={{ scale: 1.05 }}
            >
              Login
            </Button>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={handleGetStarted}
                className="bg-space-purple hover:bg-space-purple/90"
              >
                Get Started
              </Button>
            </motion.div>
          </div>
        </motion.header>
        
        {/* Hero Section - with animations */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-32">
          <motion.div 
            className="w-full lg:w-1/2 space-y-6"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.2 }}
          >
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight"
              variants={fadeInUp}
            >
              Take control of your <span className="bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">financial journey</span>
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground"
              variants={fadeInUp}
            >
              Budget Savvy helps you track expenses, analyze spending habits, and make smarter financial decisions.
            </motion.p>
            <motion.div 
              className="pt-6 flex flex-col sm:flex-row gap-4"
              variants={fadeInUp}
            >
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleGetStarted}
                  className="bg-space-purple hover:bg-space-purple/90 text-lg h-12 px-6 w-full sm:w-auto"
                  size="lg"
                >
                  Start for Free <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  variant="outline" 
                  onClick={scrollToFeatures}
                  className="text-lg h-12 px-6 group w-full sm:w-auto"
                  size="lg"
                >
                  See How It Works
                  <ChevronDown className="ml-2 group-hover:translate-y-1 transition-transform" />
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>
          <motion.div 
            className="w-full lg:w-1/2 rounded-xl bg-card/40 backdrop-blur-sm border border-border p-4 overflow-hidden"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div 
              className="relative aspect-video overflow-hidden rounded-lg border border-space-purple/20"
              whileHover={{ scale: 1.02 }}
            >
              <div className="bg-sidebar-background p-4 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                {/* Dashboard Preview with hover effects */}
                <div className="grid grid-cols-3 gap-3">
                  <motion.div 
                    className="bg-card rounded-md p-3 col-span-2 h-20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="h-2 bg-space-purple/30 rounded w-1/3 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded bg-accent/20"></div>
                      <div className="h-10 w-10 rounded bg-space-purple/20"></div>
                      <div className="h-10 w-10 rounded bg-primary/20"></div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-card rounded-md p-3 h-40 row-span-2"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="h-2 bg-space-purple/30 rounded w-2/3 mb-3"></div>
                    <div className="h-24 w-full rounded-md bg-accent/10 flex items-center justify-center">
                      <motion.div 
                        className="w-20 h-20 rounded-full border-4 border-space-purple/30 border-t-accent"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                      ></motion.div>
                    </div>
                  </motion.div>
                  <motion.div 
                    className="bg-card rounded-md p-3 h-20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="h-2 bg-space-purple/30 rounded w-1/2 mb-3"></div>
                    <div className="h-8 bg-accent/20 rounded-md"></div>
                  </motion.div>
                  <motion.div 
                    className="bg-card rounded-md p-3 h-20"
                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                  >
                    <div className="h-2 bg-space-purple/30 rounded w-1/4 mb-3"></div>
                    <div className="h-8 bg-space-purple/20 rounded-md"></div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Features Section with interactive cards */}
        <section id="features" className="mb-32 scroll-mt-20">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4">Powerful & Simple Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master your finances in one intuitive application
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.2 }}
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                }}
                onClick={() => setActiveFeature(index)}
                className={`bg-card/60 backdrop-blur-sm border rounded-xl p-6 transition-all cursor-pointer
                  ${activeFeature === index ? 'border-space-purple shadow-lg shadow-space-purple/10' : 'border-border hover:border-space-purple/30'}`}
              >
                <motion.div 
                  className="bg-background rounded-lg p-4 inline-block mb-4"
                  whileHover={{ y: -5 }}
                  animate={{ y: activeFeature === index ? -5 : 0 }}
                >
                  {feature.icon}
                </motion.div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
                {activeFeature === index && (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="mt-4 flex items-center text-space-purple"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" /> Feature Spotlight
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </section>
        
        {/* CTA Section with animated button */}
        <motion.section 
          className="mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="bg-card/70 backdrop-blur-sm border border-space-purple/20 rounded-xl p-8 md:p-12"
            whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
          >
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Finances?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who have taken control of their financial future with Budget Savvy.
              </p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
              >
                <Button 
                  onClick={handleGetStarted}
                  className="bg-space-purple hover:bg-space-purple/90 text-lg h-12 px-8"
                  size="lg"
                >
                  Create Free Account <ArrowRight className="ml-2" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </motion.section>
        
        {/* Footer */}
        <footer className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <motion.div 
                className="h-8 w-8 bg-space-purple rounded-lg flex items-center justify-center"
                whileHover={{ rotate: 10 }}
              >
                <PiggyBank className="h-5 w-5 text-white" />
              </motion.div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Budget Savvy. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              {['Privacy Policy', 'Terms of Service', 'Contact'].map((item, i) => (
                <motion.div key={i} whileHover={{ y: -2 }}>
                  <Link to="#" className="text-sm text-muted-foreground hover:text-space-purple">
                    {item}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;
