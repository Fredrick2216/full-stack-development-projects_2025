
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import BarChartComponent from "@/components/Reports/BarChartComponent";
import CategoryDistribution from "@/components/Reports/CategoryDistribution";
import LineChartComponent from "@/components/Reports/LineChartComponent";
import DownloadReportButton from "@/components/Reports/DownloadReportButton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface CategorySummary {
  category: string;
  count: number;
  total: number;
}

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [monthlyChange, setMonthlyChange] = useState<{[key: string]: number}>({});
  const navigate = useNavigate();
  
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      
      if (!user) {
        toast.error("Please login to view your reports");
        navigate("/auth");
        return;
      }
      
      setUser(user);
      fetchExpensesData(user.id);
    };
    
    checkUser();
  }, [navigate]);

  const fetchExpensesData = async (userId: string) => {
    try {
      setLoading(true);
      
      const threeMonthsAgo = new Date();
      threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
      
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq("user_id", userId)
        .gte("date", threeMonthsAgo.toISOString());
        
      if (error) throw error;
      
      const formattedExpenses = data ? data.map(expense => ({
        id: expense.id,
        title: expense.title,
        amount: parseFloat(expense.amount as unknown as string),
        category: expense.category,
        date: new Date(expense.date as string),
        note: expense.note || undefined
      })) : [];
      
      setExpenses(formattedExpenses);
      
      calculateMonthlyChanges(data || []);
      
    } catch (error: any) {
      toast.error(`Failed to fetch reports data: ${error.message}`);
      console.error("Reports data fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateMonthlyChanges = (data: any[]) => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const previousMonth = currentMonth - 1 >= 0 ? currentMonth - 1 : 11;
    const monthBeforeThat = previousMonth - 1 >= 0 ? previousMonth - 1 : 11;
    
    const currentYear = today.getFullYear();
    const yearOfPreviousMonth = currentMonth === 0 ? currentYear - 1 : currentYear;
    const yearOfMonthBeforeThat = previousMonth === 0 ? yearOfPreviousMonth - 1 : yearOfPreviousMonth;
    
    const currentMonthExpenses = data.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === currentMonth && expenseDate.getFullYear() === currentYear;
    });
    
    const previousMonthExpenses = data.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === previousMonth && expenseDate.getFullYear() === yearOfPreviousMonth;
    });
    
    const monthBeforeThatExpenses = data.filter(expense => {
      const expenseDate = new Date(expense.date);
      return expenseDate.getMonth() === monthBeforeThat && expenseDate.getFullYear() === yearOfMonthBeforeThat;
    });
    
    const currentMonthTotal = currentMonthExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount as unknown as string), 0
    );
    
    const previousMonthTotal = previousMonthExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount as unknown as string), 0
    );
    
    const monthBeforeThatTotal = monthBeforeThatExpenses.reduce(
      (sum, expense) => sum + parseFloat(expense.amount as unknown as string), 0
    );
    
    const currentToPreviousChange = previousMonthTotal === 0 
      ? 0 
      : ((currentMonthTotal - previousMonthTotal) / previousMonthTotal) * 100;
    
    const previousToBeforeChange = monthBeforeThatTotal === 0 
      ? 0 
      : ((previousMonthTotal - monthBeforeThatTotal) / monthBeforeThatTotal) * 100;
    
    setMonthlyChange({
      currentToPrevious: parseFloat(currentToPreviousChange.toFixed(1)),
      previousToBefore: parseFloat(previousToBeforeChange.toFixed(1))
    });
  };

  const totalExpenses = expenses.reduce((total, exp) => total + exp.amount, 0);
  const avgDailyExpense = expenses.length ? totalExpenses / 30 : 0;
  
  const categories = [...new Set(expenses.map(exp => exp.category))];
  const categoryCounts: CategorySummary[] = categories.map(category => {
    const categoryExpenses = expenses.filter(exp => exp.category === category);
    return {
      category,
      count: categoryExpenses.length,
      total: categoryExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    };
  });
  
  const topCategory = categoryCounts.length > 0 
    ? categoryCounts.sort((a, b) => b.total - a.total)[0] 
    : { category: 'None', total: 0, count: 0 };
    
  const mostFrequentCategory = categoryCounts.length > 0
    ? categoryCounts.sort((a, b) => b.count - a.count)[0]
    : { category: 'None', count: 0, total: 0 };
  
  const currentMonthName = new Date().toLocaleString('default', { month: 'long' });
  const currentYear = new Date().getFullYear();
  const previousMonthName = new Date(new Date().setMonth(new Date().getMonth() - 1)).toLocaleString('default', { month: 'long' });

  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground">Visualize and analyze your financial data</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              {!loading && expenses.length > 0 && (
                <>
                  <DownloadReportButton 
                    expenses={expenses} 
                    weeklyMode={true}
                    variant="secondary"
                    className="w-full sm:w-auto"
                  />
                  <DownloadReportButton 
                    expenses={expenses} 
                    month={currentMonthName} 
                    year={currentYear}
                    className="w-full sm:w-auto"
                  />
                </>
              )}
            </div>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-space-purple" />
              <span className="ml-2 text-lg">Loading your reports...</span>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid grid-cols-3 max-w-md">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="trends">Trends</TabsTrigger>
                <TabsTrigger value="insights">Insights</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6">
                <LineChartComponent expenses={expenses} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <CategoryDistribution expenses={expenses} />
                  <BarChartComponent expenses={expenses} />
                </div>
              </TabsContent>
              
              <TabsContent value="trends" className="space-y-6">
                <BarChartComponent expenses={expenses} />
                
                <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Monthly Analysis</CardTitle>
                    <CardDescription>Compare your monthly spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h3 className="text-sm font-medium">Top Expense Categories</h3>
                      <div className="space-y-3">
                        {categoryCounts.slice(0, 3).map((cat, index) => (
                          <div key={index} className="flex justify-between items-center">
                            <div className="flex items-center gap-2">
                              <div className="h-3 w-3 rounded-full" style={{
                                backgroundColor: index === 0 ? '#8B5CF6' : index === 1 ? '#D946EF' : '#6366F1'
                              }} />
                              <p className="text-sm">{cat.category}</p>
                            </div>
                            <p className="text-sm font-semibold">${cat.total.toFixed(2)}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="text-sm font-medium">Month-over-Month Change</h3>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">{currentMonthName} to {previousMonthName}</p>
                        <div className={`flex items-center ${monthlyChange.currentToPrevious > 0 ? 'text-destructive' : 'text-green-500'}`}>
                          {monthlyChange.currentToPrevious > 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {Math.abs(monthlyChange.currentToPrevious)}%
                          </span>
                        </div>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-muted-foreground">
                          {previousMonthName} to {new Date(new Date().setMonth(new Date().getMonth() - 2))
                            .toLocaleString('default', { month: 'long' })}
                        </p>
                        <div className={`flex items-center ${monthlyChange.previousToBefore > 0 ? 'text-destructive' : 'text-green-500'}`}>
                          {monthlyChange.previousToBefore > 0 ? (
                            <ArrowUpRight className="h-4 w-4 mr-1" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4 mr-1" />
                          )}
                          <span className="text-sm font-medium">
                            {Math.abs(monthlyChange.previousToBefore)}%
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="insights" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-space-purple" />
                        Daily Average
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">${avgDailyExpense.toFixed(2)}</p>
                      <p className="text-sm text-muted-foreground mt-1">Average daily spending</p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-space-accent" />
                        Highest Category
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{topCategory.category}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        ${topCategory.total.toFixed(2)} total spent
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg font-medium flex items-center gap-2">
                        <Calendar className="h-5 w-5 text-blue-500" />
                        Most Frequent
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-3xl font-bold">{mostFrequentCategory.category}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {mostFrequentCategory.count} transactions
                      </p>
                    </CardContent>
                  </Card>
                </div>
                
                <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                  <CardHeader>
                    <CardTitle className="text-lg font-medium">Spending Insights</CardTitle>
                    <CardDescription>AI-powered analysis of your spending patterns</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {topCategory.total > 0 && (
                      <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                        <p className="text-sm">
                          <span className="font-semibold">{topCategory.category} costs</span> account for{" "}
                          <span className="font-semibold">
                            {((topCategory.total / totalExpenses) * 100).toFixed(0)}%
                          </span> of your total expenses.
                        </p>
                      </div>
                    )}
                    {monthlyChange.currentToPrevious !== 0 && (
                      <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                        <p className="text-sm">
                          Your overall spending has{" "}
                          {monthlyChange.currentToPrevious > 0 ? (
                            <span className="font-semibold text-destructive">increased by {Math.abs(monthlyChange.currentToPrevious)}%</span>
                          ) : (
                            <span className="font-semibold text-green-500">decreased by {Math.abs(monthlyChange.currentToPrevious)}%</span>
                          )}{" "}
                          compared to last month.
                        </p>
                      </div>
                    )}
                    {mostFrequentCategory.count > 0 && (
                      <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                        <p className="text-sm">
                          You've made <span className="font-semibold">{mostFrequentCategory.count} transactions</span> for{" "}
                          <span className="font-semibold">{mostFrequentCategory.category}</span> this month, spending a total of{" "}
                          <span className="font-semibold">${mostFrequentCategory.total.toFixed(2)}</span>.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
