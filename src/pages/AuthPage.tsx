
import React, { useState, useEffect } from "react";
import StarField from "@/components/StarField";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";

interface LocationState {
  defaultTab?: "login" | "register";
}

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);
  
  // Extract the defaultTab from location state
  const state = location.state as LocationState | null;
  const defaultTab = state?.defaultTab || "login";
  
  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      setIsLoading(true);
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        // User is logged in, redirect to dashboard
        navigate('/dashboard');
      }
      
      setIsLoading(false);
    };
    
    checkUser();
    
    // Listen for authentication state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session && (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED')) {
        navigate('/dashboard');
      }
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);
  
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
