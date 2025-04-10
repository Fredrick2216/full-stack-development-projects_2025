
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart
} from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartLine } from "lucide-react";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date | string;
}

interface LineChartComponentProps {
  expenses: Expense[];
}

const timeRangeOptions = [
  { value: "7days", label: "7 Days" },
  { value: "30days", label: "30 Days" },
  { value: "90days", label: "90 Days" },
];

const LineChartComponent: React.FC<LineChartComponentProps> = ({ expenses }) => {
  const [timeRange, setTimeRange] = useState("30days");

  const getTimeSeriesData = () => {
    if (!expenses || expenses.length === 0) return [];

    // Convert all dates to Date objects
    const expensesWithDates = expenses.map(expense => ({
      ...expense,
      date: new Date(expense.date)
    }));

    // Sort expenses by date
    const sortedExpenses = [...expensesWithDates].sort((a, b) => 
      a.date.getTime() - b.date.getTime()
    );

    // Determine date range based on selection
    const today = new Date();
    const cutoffDate = new Date();
    if (timeRange === "7days") {
      cutoffDate.setDate(today.getDate() - 7);
    } else if (timeRange === "30days") {
      cutoffDate.setDate(today.getDate() - 30);
    } else {
      cutoffDate.setDate(today.getDate() - 90);
    }

    // Filter expenses by date range
    const filteredExpenses = sortedExpenses.filter(expense => 
      expense.date >= cutoffDate
    );

    // Group expenses by date
    const dailyExpenses: Record<string, { date: string; total: number; runningTotal: number }> = {};
    let runningTotal = 0;

    filteredExpenses.forEach(expense => {
      const dateStr = expense.date.toISOString().split('T')[0];
      
      if (!dailyExpenses[dateStr]) {
        dailyExpenses[dateStr] = {
          date: dateStr,
          total: 0,
          runningTotal: 0
        };
      }
      
      dailyExpenses[dateStr].total += expense.amount;
    });

    // Convert to array and calculate running totals
    const result = Object.values(dailyExpenses).sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );

    result.forEach((entry, index) => {
      runningTotal += entry.total;
      entry.runningTotal = runningTotal;
    });

    return result;
  };

  const data = getTimeSeriesData();
  const hasData = data.length > 0;

  // Calculate average daily expense
  const averageDailyExpense = hasData ? 
    data.reduce((sum, entry) => sum + entry.total, 0) / data.length : 0;

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium flex items-center gap-2">
            <ChartLine className="h-5 w-5 text-space-purple" />
            Expense Trends
          </CardTitle>
          <CardDescription>See how your expenses evolve over time</CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="w-32 bg-secondary/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorRunning" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D946EF" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#D946EF" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="date" 
                tick={{ fill: "#A1A1AA" }} 
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()}/${date.getMonth() + 1}`;
                }}  
              />
              <YAxis 
                tick={{ fill: "#A1A1AA" }} 
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value: number) => [`$${value.toFixed(2)}`, ""]}
                labelFormatter={(label) => {
                  const date = new Date(label);
                  return date.toLocaleDateString();
                }}
                contentStyle={{
                  backgroundColor: "rgba(22, 25, 31, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "#fff",
                }}
              />
              <Legend />
              <ReferenceLine 
                y={averageDailyExpense} 
                label={{ 
                  value: "Avg", 
                  position: "insideTopRight",
                  fill: "#10B981"
                }} 
                stroke="#10B981" 
                strokeDasharray="3 3" 
              />
              <Area 
                type="monotone" 
                dataKey="total" 
                name="Daily Expenses"
                stroke="#8B5CF6" 
                fillOpacity={1} 
                fill="url(#colorTotal)"
                animationDuration={1500}
              />
              <Line 
                type="monotone" 
                dataKey="runningTotal" 
                name="Cumulative Spending"
                stroke="#D946EF" 
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
                animationDuration={2000}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
