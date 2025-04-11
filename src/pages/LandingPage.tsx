
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, PiggyBank, TrendingUp, Shield, CheckCircle, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState("hero");
  
  // Handle scroll effect for active section
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

  // Navigation functions
  const handleGetStarted = () => {
    navigate("/auth", { state: { defaultTab: "register" } });
  };
  
  const handleLogin = () => {
    navigate("/auth", { state: { defaultTab: "login" } });
  };
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
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
  
  // Features data
  const features = [
    {
      icon: <TrendingUp className="h-7 w-7" />,
      color: "from-blue-500 to-cyan-400",
      title: "Intelligent Expense Tracking",
      description: "Automatically categorize expenses and receive personalized insights on your spending patterns."
    },
    {
      icon: <BarChart2 className="h-7 w-7" />,
      color: "from-purple-500 to-pink-400",
      title: "Visual Analytics",
      description: "Beautiful charts and reports that make understanding your financial health simple and intuitive."
    },
    {
      icon: <Shield className="h-7 w-7" />,
      color: "from-green-500 to-emerald-400",
      title: "Bank-Level Security",
      description: "Your financial data is protected with advanced encryption and secure authentication protocols."
    },
    {
      icon: <Globe className="h-7 w-7" />,
      color: "from-amber-500 to-orange-400",
      title: "Multi-Currency Support",
      description: "Manage expenses across different currencies with real-time conversion rates."
    },
    {
      icon: <Zap className="h-7 w-7" />,
      color: "from-red-500 to-rose-400",
      title: "Budget Automation",
      description: "Create intelligent budgets that adapt to your spending habits and financial goals."
    },
    {
      icon: <CheckCircle className="h-7 w-7" />,
      color: "from-indigo-500 to-sky-400",
      title: "Goal Tracking",
      description: "Set financial goals and track your progress with motivating visual feedback."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80 overflow-x-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        <div aria-hidden="true" className="absolute top-0 left-0 w-96 h-96 bg-space-purple/10 rounded-full blur-3xl animate-blob"></div>
        <div aria-hidden="true" className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 w-96 h-96 bg-space-purple/5 rounded-full blur-3xl animate-blob animation-delay-4000"></div>
      </div>
      
      {/* Header with Glassmorphism */}
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
      
      {/* Hero Section */}
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
            
            {/* Hero Image/Animation */}
            <motion.div 
              className="w-full lg:w-1/2 relative"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-space-purple/20 to-accent/20 rounded-xl blur-xl"></div>
                
                {/* Dashboard mockup */}
                <div className="relative bg-card border border-border rounded-xl overflow-hidden shadow-2xl">
                  {/* Browser mockup */}
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
                  
                  {/* Dashboard UI */}
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
                    
                    {/* Mock charts */}
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
      
      {/* Features Section */}
      <section id="features" className="py-24 bg-gradient-to-b from-background/50 to-background relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Smart Features for Financial Success</h2>
            <p className="text-lg text-muted-foreground">
              Our comprehensive suite of tools makes managing your finances simple, insightful, and even enjoyable.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="relative group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br bg-opacity-50 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-0 group-hover:opacity-20"></div>
                
                <div className="bg-card/70 backdrop-blur-sm border border-border/50 rounded-2xl p-6 h-full transition-all hover:border-space-purple/50 hover:shadow-lg relative">
                  <div className={`w-14 h-14 mb-5 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center text-white`}>
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-medium mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">How Budget Savvy Works</h2>
            <p className="text-lg text-muted-foreground">
              Getting started is quick and easy. See how our platform helps you achieve financial clarity in just three steps.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-space-purple/0 via-space-purple/30 to-accent/0"></div>
            
            {[
              {
                step: "01",
                title: "Create Your Account",
                description: "Sign up in seconds and securely connect your financial accounts to get started."
              },
              {
                step: "02",
                title: "Track Your Expenses",
                description: "Let our AI automatically categorize and track your spending patterns."
              },
              {
                step: "03",
                title: "Optimize Your Budget",
                description: "Receive personalized insights and recommendations to improve your finances."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <div className="bg-card/60 backdrop-blur-sm border border-border/50 rounded-xl p-6 text-center relative">
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-space-purple to-accent flex items-center justify-center text-white font-bold">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="text-xl font-medium mt-6 mb-3">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="py-24 bg-gradient-to-b from-background/30 to-background relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Simple, Transparent Pricing</h2>
            <p className="text-lg text-muted-foreground">
              Choose the plan that fits your needs - from personal budgeting to family finance management.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                name: "Free",
                price: "$0",
                description: "Perfect for individuals just getting started with budgeting",
                features: [
                  "Basic expense tracking",
                  "Limited monthly reports",
                  "2 financial accounts",
                  "Email support"
                ],
                highlight: false
              },
              {
                name: "Premium",
                price: "$9.99",
                period: "/month",
                description: "Ideal for individuals serious about financial growth",
                features: [
                  "Advanced expense analytics",
                  "Unlimited custom reports",
                  "Unlimited financial accounts",
                  "Budget automation",
                  "Priority support"
                ],
                highlight: true
              },
              {
                name: "Family",
                price: "$19.99",
                period: "/month",
                description: "Perfect for managing household finances together",
                features: [
                  "Everything in Premium",
                  "Up to 5 user accounts",
                  "Family budget planning",
                  "Shared expense tracking",
                  "Financial goal collaboration"
                ],
                highlight: false
              }
            ].map((plan, index) => (
              <motion.div
                key={index}
                className={`relative ${plan.highlight ? "md:-mt-4 md:mb-4" : ""}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {plan.highlight && (
                  <div className="absolute -top-5 left-0 w-full flex justify-center">
                    <span className="bg-gradient-to-r from-space-purple to-accent text-white text-sm px-4 py-1 rounded-full font-medium">Most Popular</span>
                  </div>
                )}
                
                <div className={`h-full bg-card/60 backdrop-blur-sm border rounded-xl p-8 flex flex-col ${
                  plan.highlight 
                    ? "border-space-purple shadow-lg shadow-space-purple/10" 
                    : "border-border/50"
                }`}>
                  <h3 className="text-xl font-medium mb-2">{plan.name}</h3>
                  <div className="flex items-end mb-4">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    {plan.period && <span className="text-muted-foreground ml-1 mb-1">{plan.period}</span>}
                  </div>
                  <p className="text-muted-foreground mb-6">{plan.description}</p>
                  <ul className="mb-8 space-y-3 flex-grow">
                    {plan.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-space-purple mr-2 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button 
                      className={`w-full ${
                        plan.highlight 
                          ? "bg-space-purple hover:bg-space-purple/90" 
                          : "bg-muted hover:bg-muted/90"
                      }`}
                      onClick={handleGetStarted}
                    >
                      Get Started
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-4">
          <motion.div 
            className="max-w-4xl mx-auto bg-gradient-to-br from-space-purple/20 to-accent/20 backdrop-blur-md border border-space-purple/20 rounded-2xl p-10 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Financial Life?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users who have already taken control of their finances with Budget Savvy. Start your journey today.
            </p>
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Button 
                onClick={handleGetStarted}
                className="bg-space-purple hover:bg-space-purple/90 text-lg px-8 py-6 h-auto"
                size="lg"
              >
                Start For Free <ArrowRight className="ml-2" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
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
    </div>
  );
};

export default LandingPage;
