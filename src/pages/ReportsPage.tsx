
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import BarChartComponent from "@/components/Reports/BarChartComponent";
import CategoryDistribution from "@/components/Reports/CategoryDistribution";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, DollarSign, Calendar } from "lucide-react";

// Mock expenses data
const mockExpenses = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 85.75,
    category: "Groceries",
    date: new Date("2023-06-15"),
  },
  {
    id: 2,
    title: "Coffee",
    amount: 4.50,
    category: "Coffee",
    date: new Date("2023-06-14"),
  },
  {
    id: 3,
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: new Date("2023-06-12"),
  },
  {
    id: 4,
    title: "Gasoline",
    amount: 45.25,
    category: "Transportation",
    date: new Date("2023-06-10"),
  },
  {
    id: 5,
    title: "Rent",
    amount: 1200,
    category: "Housing",
    date: new Date("2023-06-01"),
  },
  {
    id: 6,
    title: "Electricity Bill",
    amount: 85.20,
    category: "Utilities",
    date: new Date("2023-06-05"),
  },
  {
    id: 7,
    title: "Internet",
    amount: 65.99,
    category: "Utilities",
    date: new Date("2023-06-03"),
  },
  {
    id: 8,
    title: "Dinner with Friends",
    amount: 65.30,
    category: "Food",
    date: new Date("2023-06-08"),
  },
  {
    id: 9,
    title: "Movie Tickets",
    amount: 25.50,
    category: "Entertainment",
    date: new Date("2023-05-28"),
  },
  {
    id: 10,
    title: "Lunch",
    amount: 12.99,
    category: "Food",
    date: new Date("2023-05-25"),
  },
  {
    id: 11,
    title: "Gym Membership",
    amount: 50,
    category: "Health",
    date: new Date("2023-05-20"),
  },
  {
    id: 12,
    title: "Books",
    amount: 35.76,
    category: "Education",
    date: new Date("2023-05-15"),
  },
  {
    id: 13,
    title: "Clothing",
    amount: 120.30,
    category: "Shopping",
    date: new Date("2023-05-10"),
  },
  {
    id: 14,
    title: "Phone Bill",
    amount: 70.45,
    category: "Utilities",
    date: new Date("2023-05-05"),
  },
  {
    id: 15,
    title: "Groceries",
    amount: 95.23,
    category: "Groceries",
    date: new Date("2023-05-03"),
  },
];

const ReportsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("overview");
  
  // Calculate insights
  const totalExpenses = mockExpenses.reduce((total, exp) => total + exp.amount, 0);
  const avgDailyExpense = totalExpenses / 30; // Assuming one month
  
  const categories = [...new Set(mockExpenses.map(exp => exp.category))];
  const categoryCounts = categories.map(category => {
    return {
      category,
      count: mockExpenses.filter(exp => exp.category === category).length,
      total: mockExpenses.filter(exp => exp.category === category).reduce((sum, exp) => sum + exp.amount, 0)
    };
  });
  
  const topCategory = categoryCounts.sort((a, b) => b.total - a.total)[0];
  const mostFrequentCategory = categoryCounts.sort((a, b) => b.count - a.count)[0];
  
  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
            <p className="text-muted-foreground">Visualize and analyze your financial data</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="insights">Insights</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CategoryDistribution expenses={mockExpenses} />
                <BarChartComponent expenses={mockExpenses} />
              </div>
            </TabsContent>
            
            <TabsContent value="trends" className="space-y-6">
              <BarChartComponent expenses={mockExpenses} />
              
              <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                <CardHeader>
                  <CardTitle className="text-lg font-medium">Monthly Analysis</CardTitle>
                  <CardDescription>Compare your monthly spending patterns</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium">Top Expense Categories</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-space-purple" />
                          <p className="text-sm">Housing</p>
                        </div>
                        <p className="text-sm font-semibold">$1,200.00</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-space-accent" />
                          <p className="text-sm">Utilities</p>
                        </div>
                        <p className="text-sm font-semibold">$221.64</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full bg-blue-500" />
                          <p className="text-sm">Groceries</p>
                        </div>
                        <p className="text-sm font-semibold">$180.98</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-sm font-medium">Month-over-Month Change</h3>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">May to June</p>
                      <div className="flex items-center text-destructive">
                        <ArrowUpRight className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">8.5%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-sm text-muted-foreground">April to May</p>
                      <div className="flex items-center text-green-500">
                        <ArrowDownRight className="h-4 w-4 mr-1" />
                        <span className="text-sm font-medium">3.2%</span>
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
                  <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                    <p className="text-sm">
                      <span className="font-semibold">Housing costs</span> account for{" "}
                      <span className="font-semibold">48%</span> of your total expenses, which is{" "}
                      <span className="font-semibold text-amber-500">10% higher</span> than the recommended budget allocation.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                    <p className="text-sm">
                      Your spending on <span className="font-semibold">Entertainment</span> has{" "}
                      <span className="font-semibold text-green-500">decreased by 15%</span> compared to last month.
                    </p>
                  </div>
                  <div className="p-4 rounded-lg bg-secondary/50 border border-space-purple/20">
                    <p className="text-sm">
                      You've made <span className="font-semibold">5 transactions</span> for{" "}
                      <span className="font-semibold">Coffee</span> this month, spending a total of{" "}
                      <span className="font-semibold">$22.50</span>.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ReportsPage;
