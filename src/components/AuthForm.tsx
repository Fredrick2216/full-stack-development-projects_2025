
import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

type FormValues = z.infer<typeof formSchema>;

interface AuthFormProps {
  defaultTab?: "login" | "register";
}

const AuthForm = ({ defaultTab = "login" }: AuthFormProps) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<"login" | "register">(defaultTab);
  const navigate = useNavigate();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);

    try {
      if (activeTab === "login") {
        const { error } = await supabase.auth.signInWithPassword({
          email: values.email,
          password: values.password,
        });
        
        if (error) throw error;
        
        toast.success("Login successful!");
        navigate("/dashboard");
        
      } else {
        const { error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            emailRedirectTo: window.location.origin + "/dashboard",
          },
        });
        
        if (error) throw error;
        
        toast.success("Registration successful! Please check your email to verify your account.");
        setActiveTab("login");
      }
    } catch (error: any) {
      toast.error(error.message || "Authentication failed");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-space-purple/20">
      <Tabs value={activeTab} onValueChange={(value: string) => setActiveTab(value as "login" | "register")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>

        <CardHeader>
          <CardTitle>{activeTab === "login" ? "Login" : "Create an account"}</CardTitle>
          <CardDescription>
            {activeTab === "login"
              ? "Enter your credentials to access your account"
              : "Fill in your details to create a new account"}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="your.email@example.com"
                        {...field}
                        className="bg-secondary/60"
                        type="email"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="••••••••"
                        {...field}
                        className="bg-secondary/60"
                        type="password"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full bg-space-purple hover:bg-space-purple/90"
                disabled={isLoading}
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {activeTab === "login" ? "Login" : "Register"}
              </Button>
            </form>
          </Form>
        </CardContent>

        <CardFooter className="flex flex-col">
          <p className="mt-2 text-sm text-muted-foreground text-center">
            {activeTab === "login"
              ? "Don't have an account? "
              : "Already have an account? "}
            <Button
              variant="link"
              onClick={() => setActiveTab(activeTab === "login" ? "register" : "login")}
              className="p-0 h-auto"
            >
              {activeTab === "login" ? "Register" : "Login"}
            </Button>
          </p>
        </CardFooter>
      </Tabs>
    </Card>
  );
};

export default AuthForm;
