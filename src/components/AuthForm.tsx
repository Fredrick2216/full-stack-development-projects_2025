
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "signup" | "reset";

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      if (mode === "signup") {
        if (password !== confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }
        // In a real app, we'd connect to Supabase here
        toast.success("Account created successfully! Please check your email for verification.");
        setTimeout(() => {
          setMode("login");
        }, 2000);
      } else if (mode === "login") {
        // In a real app, we'd connect to Supabase here
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else if (mode === "reset") {
        // In a real app, we'd connect to Supabase here
        toast.success("Reset link sent to your email");
        setTimeout(() => {
          setMode("login");
        }, 2000);
      }
    } catch (error) {
      toast.error("Authentication failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md border-space-purple/20 bg-card/90 backdrop-blur-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold tracking-tight">
            {mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Reset Password"}
          </CardTitle>
          <CardDescription>
            {mode === "login"
              ? "Enter your credentials to access your account"
              : mode === "signup"
              ? "Fill out the form to create your account"
              : "Enter your email to receive a reset link"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-secondary/50"
              />
            </div>
            
            {mode !== "reset" && (
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>
            )}
            
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-secondary/50"
                />
              </div>
            )}
            
            <Button type="submit" className="w-full bg-space-purple hover:bg-space-purple/90" disabled={loading}>
              {loading ? "Processing..." : mode === "login" ? "Sign In" : mode === "signup" ? "Create Account" : "Send Reset Link"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4 text-center">
          {mode === "login" && (
            <>
              <Button
                variant="link"
                onClick={() => setMode("reset")}
                className="text-muted-foreground hover:text-accent"
              >
                Forgot password?
              </Button>
              <div>
                Don't have an account?{" "}
                <Button
                  variant="link"
                  onClick={() => setMode("signup")}
                  className="text-space-accent hover:underline"
                >
                  Create one
                </Button>
              </div>
            </>
          )}
          
          {mode === "signup" && (
            <div>
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={() => setMode("login")}
                className="text-space-accent hover:underline"
              >
                Sign in
              </Button>
            </div>
          )}
          
          {mode === "reset" && (
            <Button
              variant="link"
              onClick={() => setMode("login")}
              className="text-space-accent hover:underline"
            >
              Back to sign in
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthForm;
