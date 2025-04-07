
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import ExpenseSummary from "@/components/Dashboard/ExpenseSummary";
import ExpenseChart from "@/components/Dashboard/ExpenseChart";
import RecentExpenses from "@/components/Dashboard/RecentExpenses";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Dashboard: React.FC = () => {
  const [chartData, setChartData] = useState<any[]>([]);
  const [recentExpenses, setRecentExpenses] = useState<any[]>([]);
  const [totalSpent, setTotalSpent] = useState(0);
  const [percentageChange, setPercentageChange] = useState(0);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();
  
  // Monthly budget - could be made dynamic in future versions
  const monthlyBudget = 3000;

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      
      if (!user) {
        toast.error("Please login to view your dashboard");
        navigate("/auth");
        return;
      }
      
      setUser(user);
      fetchExpensesData(user.id);
    };
    
    checkUser();
  }, [navigate]);

  // Fetch expenses data for dashboard
  const fetchExpensesData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Get current date and calculate dates for analysis
      const today = new Date();
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1).toISOString();
      const firstDayOfLastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1).toISOString();
      const lastDayOfLastMonth = new Date(today.getFullYear(), today.getMonth(), 0).toISOString();
      
      // Get current month expenses
      const { data: currentMonthData, error: currentMonthError } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .gte("date", firstDayOfMonth);
        
      if (currentMonthError) throw currentMonthError;
      
      // Get last month expenses
      const { data: lastMonthData, error: lastMonthError } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .gte("date", firstDayOfLastMonth)
        .lte("date", lastDayOfLastMonth);
        
      if (lastMonthError) throw lastMonthError;

      // Process data for charts and statistics
      processExpensesData(currentMonthData, lastMonthData);
      
    } catch (error: any) {
      toast.error(`Failed to fetch dashboard data: ${error.message}`);
      console.error("Dashboard data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Process expenses data for charts and statistics
  const processExpensesData = (currentMonthData: any[], lastMonthData: any[]) => {
    // Calculate total spent this month
    const currentMonthTotal = currentMonthData.reduce(
      (sum, expense) => sum + parseFloat(expense.amount), 0
    );
    setTotalSpent(currentMonthTotal);
    
    // Calculate percentage change from last month
    const lastMonthTotal = lastMonthData.reduce(
      (sum, expense) => sum + parseFloat(expense.amount), 0
    );
    
    const change = lastMonthTotal === 0 
      ? 0 
      : ((currentMonthTotal - lastMonthTotal) / lastMonthTotal) * 100;
    setPercentageChange(parseFloat(change.toFixed(1)));
    
    // Process data for pie chart (expenses by category)
    const categories = new Map<string, number>();
    currentMonthData.forEach((expense) => {
      const category = expense.category;
      const amount = parseFloat(expense.amount);
      categories.set(category, (categories.get(category) || 0) + amount);
    });
    
    // Prepare chart data with consistent colors
    const categoryColors: { [key: string]: string } = {
      "Food": "#8B5CF6",
      "Rent": "#D946EF",
      "Housing": "#D946EF", // Same as Rent
      "Transportation": "#6366F1",
      "Entertainment": "#0EA5E9",
      "Utilities": "#10B981",
      "Coffee": "#F59E0B",
      "Groceries": "#3B82F6",
      "Shopping": "#EC4899",
      "Healthcare": "#14B8A6",
      "Education": "#8B5CF6",
      "Travel": "#F43F5E"
    };
    
    const chartDataArray = Array.from(categories.entries()).map(([name, value]) => ({
      name,
      value,
      color: categoryColors[name] || "#64748B" // Default color if category is not in the mapping
    }));
    
    setChartData(chartDataArray);
    
    // Prepare recent expenses data (only most recent 5)
    const recentExpensesData = [...currentMonthData]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5)
      .map(expense => ({
        id: expense.id,
        title: expense.title,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: new Date(expense.date).toLocaleDateString()
      }));
      
    setRecentExpenses(recentExpensesData);
  };

  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back to your financial overview.</p>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-space-purple" />
              <span className="ml-2 text-lg">Loading your dashboard...</span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-3 md:col-span-1">
                  <ExpenseSummary 
                    totalSpent={totalSpent} 
                    monthlyBudget={monthlyBudget} 
                    percentageChange={percentageChange} 
                  />
                </div>
                <div className="col-span-3 md:col-span-2">
                  <ExpenseChart data={chartData.length > 0 ? chartData : [{name: "No Data", value: 100, color: "#64748B"}]} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6">
                <RecentExpenses expenses={recentExpenses} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
