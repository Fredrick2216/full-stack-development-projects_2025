
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

type PlanType = "free" | "premium" | "family";

export const useStripeCheckout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = async (plan: PlanType) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Check if user is logged in
      const { data: sessionData } = await supabase.auth.getSession();
      
      if (!sessionData.session) {
        // Redirect to auth page if not logged in
        navigate("/auth", { 
          state: { 
            defaultTab: "register", 
            forceShowForm: true,
            redirectAfterAuth: true,
            selectedPlan: plan
          }
        });
        return;
      }
      
      // If free plan, skip payment
      if (plan === "free") {
        toast.success("You've selected the Free plan");
        navigate("/dashboard");
        return;
      }
      
      // Call the create-checkout function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan },
      });
      
      if (error) {
        throw new Error(error.message);
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(`Payment error: ${error.message || "Failed to process payment"}`);
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleCheckout, isLoading };
};
