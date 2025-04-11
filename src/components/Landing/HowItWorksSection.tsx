
import React from "react";
import { motion } from "framer-motion";

const HowItWorksSection: React.FC = () => {
  const steps = [
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
  ];

  return (
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
          <div className="hidden md:block absolute top-24 left-0 w-full h-0.5 bg-gradient-to-r from-space-purple/0 via-space-purple/30 to-accent/0"></div>
          
          {steps.map((item, index) => (
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
  );
};

export default HowItWorksSection;
