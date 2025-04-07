
import React from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import ExpenseSummary from "@/components/Dashboard/ExpenseSummary";
import ExpenseChart from "@/components/Dashboard/ExpenseChart";
import RecentExpenses from "@/components/Dashboard/RecentExpenses";

const mockChartData = [
  { name: "Food", value: 420, color: "#8B5CF6" },
  { name: "Rent", value: 1200, color: "#D946EF" },
  { name: "Transportation", value: 180, color: "#6366F1" },
  { name: "Entertainment", value: 250, color: "#0EA5E9" },
  { name: "Utilities", value: 150, color: "#10B981" },
];

const mockRecentExpenses = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 85.75,
    category: "Groceries",
    date: "Jun 15, 2023",
  },
  {
    id: 2,
    title: "Coffee",
    amount: 4.50,
    category: "Coffee",
    date: "Jun 14, 2023",
  },
  {
    id: 3,
    title: "Netflix Subscription",
    amount: 15.99,
    category: "Entertainment",
    date: "Jun 12, 2023",
  },
  {
    id: 4,
    title: "Gasoline",
    amount: 45.25,
    category: "Transportation",
    date: "Jun 10, 2023",
  },
  {
    id: 5,
    title: "Dinner with Friends",
    amount: 65.30,
    category: "Food",
    date: "Jun 8, 2023",
  },
];

const Dashboard: React.FC = () => {
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-3 md:col-span-1">
              <ExpenseSummary 
                totalSpent={2200.75} 
                monthlyBudget={3000} 
                percentageChange={12.5} 
              />
            </div>
            <div className="col-span-3 md:col-span-2">
              <ExpenseChart data={mockChartData} />
            </div>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <RecentExpenses expenses={mockRecentExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
