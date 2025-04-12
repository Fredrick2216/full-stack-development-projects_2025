
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
      
      toast.info("Preparing checkout...");
      
      // Call the create-checkout function
      const { data, error } = await supabase.functions.invoke("create-checkout", {
        body: { plan },
      });
      
      if (error) {
        console.error("Stripe function error:", error);
        throw new Error(error.message || "Failed to create checkout session");
      }
      
      if (!data) {
        throw new Error("No data returned from the checkout function");
      }
      
      if (data?.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else if (data?.message) {
        toast.info(data.message);
        navigate("/dashboard");
      } else {
        console.error("Unexpected response:", data);
        throw new Error("No checkout URL returned");
      }
    } catch (error: any) {
      console.error("Checkout error:", error);
      toast.error(`Payment error: ${error.message || "Failed to process payment"}`);
      // We don't redirect to dashboard on error anymore, so the user can try again
    } finally {
      setIsLoading(false);
    }
  };
  
  return { handleCheckout, isLoading };
};
