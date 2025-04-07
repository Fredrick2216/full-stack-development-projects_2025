
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ShoppingBag, Coffee, ShoppingCart, Home, Utensils, Laptop } from "lucide-react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: string;
}

interface RecentExpensesProps {
  expenses: Expense[];
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "shopping":
      return <ShoppingBag className="h-4 w-4" />;
    case "food":
      return <Utensils className="h-4 w-4" />;
    case "coffee":
      return <Coffee className="h-4 w-4" />;
    case "groceries":
      return <ShoppingCart className="h-4 w-4" />;
    case "rent":
      return <Home className="h-4 w-4" />;
    case "electronics":
      return <Laptop className="h-4 w-4" />;
    default:
      return <ShoppingBag className="h-4 w-4" />;
  }
};

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "shopping":
      return "bg-blue-500";
    case "food":
      return "bg-orange-500";
    case "coffee":
      return "bg-amber-700";
    case "groceries":
      return "bg-green-500";
    case "rent":
      return "bg-purple-500";
    case "electronics":
      return "bg-cyan-500";
    default:
      return "bg-gray-500";
  }
};

const RecentExpenses: React.FC<RecentExpensesProps> = ({ expenses }) => {
  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20 hover:border-space-purple/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Recent Expenses</CardTitle>
        <CardDescription>Your latest transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {expenses.length > 0 ? (
            expenses.map((expense) => (
              <div
                key={expense.id}
                className="flex items-center justify-between border-b border-border pb-3 last:border-0 last:pb-0"
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${getCategoryColor(expense.category)}`}>
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <p className="font-medium">{expense.title}</p>
                    <p className="text-xs text-muted-foreground">{expense.date}</p>
                  </div>
                </div>
                <p className="font-semibold">${expense.amount.toFixed(2)}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-muted-foreground py-4">
              No recent expenses to show
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentExpenses;
