
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { toast } from "sonner";

const PricingSection: React.FC = () => {
  const navigate = useNavigate();
  const { handleCheckout, isLoading } = useStripeCheckout();

  const pricingPlans = [
    {
      id: "free",
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
      id: "premium",
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
      id: "family",
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
  ];

  const handlePlanSelection = async (planId: string) => {
    if (isLoading) return;
    
    try {
      await handleCheckout(planId as "free" | "premium" | "family");
    } catch (error) {
      console.error("Error selecting plan:", error);
      toast.error("Failed to select plan. Please try again.");
    }
  };

  return (
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
          {pricingPlans.map((plan, index) => (
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
                    onClick={() => handlePlanSelection(plan.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : "Get Started"}
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
