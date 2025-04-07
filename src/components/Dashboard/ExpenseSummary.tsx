
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, TrendingUp } from "lucide-react";

interface ExpenseSummaryProps {
  totalSpent: number;
  monthlyBudget: number;
  percentageChange: number;
}

const ExpenseSummary: React.FC<ExpenseSummaryProps> = ({
  totalSpent,
  monthlyBudget,
  percentageChange,
}) => {
  const budgetUsedPercentage = (totalSpent / monthlyBudget) * 100;
  const formattedBudgetPercentage = Math.min(budgetUsedPercentage, 100).toFixed(0);

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20 hover:border-space-purple/30 transition-all duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Monthly Overview</CardTitle>
        <CardDescription>Your spending summary for this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Spent</p>
              <p className="text-2xl font-bold">${totalSpent.toFixed(2)}</p>
            </div>
            <div className="bg-secondary p-3 rounded-full">
              <TrendingUp className="h-5 w-5 text-primary" />
            </div>
          </div>

          <div className="grid gap-2">
            <div className="flex items-center justify-between text-sm">
              <p className="text-muted-foreground">Monthly Budget</p>
              <p className="font-medium">${monthlyBudget.toFixed(2)}</p>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div
                className={`h-full rounded-full ${
                  budgetUsedPercentage > 90
                    ? "bg-destructive"
                    : budgetUsedPercentage > 70
                    ? "bg-amber-500"
                    : "bg-space-purple"
                }`}
                style={{ width: `${formattedBudgetPercentage}%` }}
              />
            </div>
            <p className="text-xs text-right text-muted-foreground">{formattedBudgetPercentage}% used</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <p className="text-sm text-muted-foreground">From last month</p>
            <div
              className={`flex items-center gap-1 text-sm font-medium ${
                percentageChange > 0 ? "text-destructive" : "text-green-500"
              }`}
            >
              {percentageChange > 0 ? (
                <ArrowUpRight className="h-4 w-4" />
              ) : (
                <ArrowDownRight className="h-4 w-4" />
              )}
              {Math.abs(percentageChange)}%
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseSummary;
