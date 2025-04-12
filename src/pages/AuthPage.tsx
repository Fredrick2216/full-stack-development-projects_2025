
import React, { useState, useEffect } from "react";
import StarField from "@/components/StarField";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { toast } from "sonner";

interface LocationState {
  defaultTab?: "login" | "register";
  forceShowForm?: boolean;
  redirectAfterAuth?: boolean;
  selectedPlan?: "free" | "premium" | "family";
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  const { handleCheckout } = useStripeCheckout();
  const [processingAuth, setProcessingAuth] = useState(false);
  
  // Extract state from location
  const state = location.state as LocationState | null;
  const defaultTab = state?.defaultTab || "login";
  const forceShowForm = state?.forceShowForm || false;
  const redirectAfterAuth = state?.redirectAfterAuth || false;
  const selectedPlan = state?.selectedPlan;
  
  // Handle post-authentication actions
  const handlePostAuthAction = (userSession: any) => {
    if (!userSession || processingAuth) return;
    
    setProcessingAuth(true);
    
    try {
      // If user just signed in and came from pricing selection with a plan, proceed to checkout
      if (redirectAfterAuth && selectedPlan) {
        // Use setTimeout to ensure it runs after the current call stack is clear
        // This helps prevent issues with auth state not being fully updated
        setTimeout(() => {
          handleCheckout(selectedPlan);
        }, 100);
        return;
      }
      
      // Otherwise, redirect to dashboard if not explicitly showing the form
      if (!forceShowForm) {
        navigate('/dashboard');
      }
    } finally {
      setProcessingAuth(false);
    }
  };
  
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const { data } = await supabase.auth.getSession();
        
        if (data.session) {
          handlePostAuthAction(data.session);
        }
      } catch (error) {
        console.error("Auth session check error:", error);
        toast.error("Failed to check authentication status");
      } finally {
        setIsLoading(false);
      }
    };
    
    checkUser();
    
    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        handlePostAuthAction(session);
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, forceShowForm, redirectAfterAuth, selectedPlan]);
  
  return (
    <div className="min-h-screen w-full space-bg animate-space flex items-center justify-center px-4">
      <StarField />
      <div className="flex flex-col items-center max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-space-purple to-space-accent bg-clip-text text-transparent animate-pulse">
            Budget Savvy
          </h1>
          <p className="mt-2 text-muted-foreground">
            {defaultTab === "login" ? "Welcome back! Sign in to your account" : "Create an account to get started"}
          </p>
        </div>
        {isLoading ? (
          <div className="flex flex-col items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-space-purple" />
            <p className="mt-4">Checking authentication...</p>
          </div>
        ) : (
          <AuthForm defaultTab={defaultTab} />
        )}
      </div>
    </div>
  );
};

export default AuthPage;
