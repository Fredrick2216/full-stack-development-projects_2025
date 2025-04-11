
import React from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CallToAction: React.FC = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/auth", { state: { defaultTab: "register" } });
  };

  return (
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
  );
};

export default CallToAction;
