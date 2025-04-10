
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { ArrowRight, BarChart2, PiggyBank, TrendingUp, Shield } from "lucide-react";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-sidebar-background overflow-hidden relative">
      {/* Abstract animated background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute w-[500px] h-[500px] rounded-full bg-space-purple/20 blur-3xl -top-64 -left-64 animate-pulse"></div>
        <div className="absolute w-[400px] h-[400px] rounded-full bg-accent/20 blur-3xl top-1/2 -right-64 animate-pulse" style={{ animationDelay: "1s" }}></div>
        <div className="absolute w-[500px] h-[500px] rounded-full bg-space-purple/10 blur-3xl -bottom-64 left-1/3 animate-pulse" style={{ animationDelay: "2s" }}></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-12">
        {/* Header */}
        <header className="flex justify-between items-center mb-20">
          <div className="flex items-center gap-2">
            <div className="h-10 w-10 bg-space-purple rounded-lg flex items-center justify-center">
              <PiggyBank className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">
              Budget Savvy
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              onClick={() => navigate("/auth")}
              className="hover:text-space-purple"
            >
              Login
            </Button>
            <Button 
              onClick={() => navigate("/auth", { state: { defaultTab: "register" } })}
              className="bg-space-purple hover:bg-space-purple/90"
            >
              Get Started
            </Button>
          </div>
        </header>
        
        {/* Hero Section */}
        <div className="flex flex-col-reverse lg:flex-row items-center gap-12 mb-32">
          <div className="w-full lg:w-1/2 space-y-6">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Take control of your <span className="bg-gradient-to-r from-space-purple to-accent bg-clip-text text-transparent">financial journey</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Budget Savvy helps you track expenses, analyze spending habits, and make smarter financial decisions.
            </p>
            <div className="pt-6 flex flex-col sm:flex-row gap-4">
              <Button 
                onClick={() => navigate("/auth", { state: { defaultTab: "register" } })}
                className="bg-space-purple hover:bg-space-purple/90 text-lg h-12 px-6"
                size="lg"
              >
                Start for Free <ArrowRight className="ml-2" />
              </Button>
              <Button 
                variant="outline" 
                onClick={() => {
                  const demoSection = document.getElementById('features');
                  demoSection?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="text-lg h-12 px-6"
                size="lg"
              >
                See How It Works
              </Button>
            </div>
          </div>
          <div className="w-full lg:w-1/2 rounded-xl bg-card/40 backdrop-blur-sm border border-border p-4">
            <div className="relative aspect-video overflow-hidden rounded-lg border border-space-purple/20">
              <div className="bg-sidebar-background p-4 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-3 w-3 rounded-full bg-destructive"></div>
                  <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                  <div className="h-3 w-3 rounded-full bg-green-500"></div>
                </div>
                {/* Dashboard Preview */}
                <div className="grid grid-cols-3 gap-3">
                  <div className="bg-card rounded-md p-3 col-span-2 h-20">
                    <div className="h-2 bg-space-purple/30 rounded w-1/3 mb-2"></div>
                    <div className="flex gap-2">
                      <div className="h-10 w-10 rounded bg-accent/20"></div>
                      <div className="h-10 w-10 rounded bg-space-purple/20"></div>
                      <div className="h-10 w-10 rounded bg-primary/20"></div>
                    </div>
                  </div>
                  <div className="bg-card rounded-md p-3 h-40 row-span-2">
                    <div className="h-2 bg-space-purple/30 rounded w-2/3 mb-3"></div>
                    <div className="h-24 w-full rounded-md bg-accent/10 flex items-center justify-center">
                      <div className="w-20 h-20 rounded-full border-4 border-space-purple/30 border-t-accent"></div>
                    </div>
                  </div>
                  <div className="bg-card rounded-md p-3 h-20">
                    <div className="h-2 bg-space-purple/30 rounded w-1/2 mb-3"></div>
                    <div className="h-8 bg-accent/20 rounded-md"></div>
                  </div>
                  <div className="bg-card rounded-md p-3 h-20">
                    <div className="h-2 bg-space-purple/30 rounded w-1/4 mb-3"></div>
                    <div className="h-8 bg-space-purple/20 rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Features Section */}
        <section id="features" className="mb-32">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful & Simple Features</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Everything you need to master your finances in one intuitive application
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={<BarChart2 className="h-10 w-10 text-space-purple" />}
              title="Visual Analytics"
              description="Gain insights through intuitive charts and visualizations that make complex financial data easy to understand."
            />
            <FeatureCard 
              icon={<TrendingUp className="h-10 w-10 text-accent" />}
              title="Expense Tracking"
              description="Effortlessly log and categorize your expenses to see where your money is going."
            />
            <FeatureCard 
              icon={<Shield className="h-10 w-10 text-green-500" />}
              title="Secure & Private"
              description="Your financial data is encrypted and securely stored, accessible only to you."
            />
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mb-20">
          <div className="bg-card/70 backdrop-blur-sm border border-space-purple/20 rounded-xl p-8 md:p-12">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Finances?</h2>
              <p className="text-xl text-muted-foreground mb-8">
                Join thousands of users who have taken control of their financial future with Budget Savvy.
              </p>
              <Button 
                onClick={() => navigate("/auth", { state: { defaultTab: "register" } })}
                className="bg-space-purple hover:bg-space-purple/90 text-lg h-12 px-8"
                size="lg"
              >
                Create Free Account <ArrowRight className="ml-2" />
              </Button>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="h-8 w-8 bg-space-purple rounded-lg flex items-center justify-center">
                <PiggyBank className="h-5 w-5 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Budget Savvy. All rights reserved.
              </p>
            </div>
            <div className="flex gap-6">
              <Link to="#" className="text-sm text-muted-foreground hover:text-space-purple">
                Privacy Policy
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-space-purple">
                Terms of Service
              </Link>
              <Link to="#" className="text-sm text-muted-foreground hover:text-space-purple">
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-card/60 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-space-purple/30 transition-all hover:shadow-md hover:shadow-space-purple/5 group">
      <div className="bg-background rounded-lg p-4 inline-block mb-4 group-hover:-translate-y-1 transition-transform">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default LandingPage;
