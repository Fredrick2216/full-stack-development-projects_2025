
import React, { useState, useEffect } from "react";
import StarField from "@/components/StarField";
import AuthForm from "@/components/AuthForm";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  
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
            Track, analyze, and optimize your financial journey
          </p>
        </div>
        {!isLoading && <AuthForm />}
      </div>
    </div>
  );
};

export default AuthPage;
