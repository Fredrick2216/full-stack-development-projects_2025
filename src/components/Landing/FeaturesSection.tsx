
import React from "react";
import { motion } from "framer-motion";
import { BarChart2, PiggyBank, TrendingUp, Shield, CheckCircle, Globe, Zap } from "lucide-react";

const FeaturesSection: React.FC = () => {
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
  );
};

export default FeaturesSection;
