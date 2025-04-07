
import React from "react";
import StarField from "@/components/StarField";
import AuthForm from "@/components/AuthForm";

const AuthPage: React.FC = () => {
  return (
    <div className="min-h-screen w-full space-bg animate-space flex items-center justify-center px-4">
      <StarField />
      <div className="flex flex-col items-center max-w-md w-full">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-space-purple to-space-accent bg-clip-text text-transparent animate-pulse">
            Smart Expense
          </h1>
          <p className="mt-2 text-muted-foreground">
            Track, analyze, and optimize your financial journey
          </p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default AuthPage;
