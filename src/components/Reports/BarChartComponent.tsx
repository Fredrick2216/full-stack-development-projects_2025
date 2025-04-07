
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date | string;
}

interface BarChartComponentProps {
  expenses: Expense[];
}

const periodOptions = [
  { value: "daily", label: "Daily" },
  { value: "weekly", label: "Weekly" },
  { value: "monthly", label: "Monthly" },
];

const BarChartComponent: React.FC<BarChartComponentProps> = ({ expenses }) => {
  const [period, setPeriod] = useState("monthly");

  const getAggregatedData = () => {
    if (!expenses || expenses.length === 0) return [];

    let data: { name: string; amount: number }[] = [];
    
    if (period === "daily") {
      // Group by day of the current month
      const groupedByDay: Record<string, number> = {};
      
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const day = date.getDate();
        const key = `Day ${day}`;
        groupedByDay[key] = (groupedByDay[key] || 0) + expense.amount;
      });
      
      data = Object.keys(groupedByDay).map((key) => ({
        name: key,
        amount: groupedByDay[key],
      }));
    } else if (period === "weekly") {
      // Group by week of the current year
      const groupedByWeek: Record<string, number> = {};
      
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const weekNumber = getWeekNumber(date);
        const key = `Week ${weekNumber}`;
        groupedByWeek[key] = (groupedByWeek[key] || 0) + expense.amount;
      });
      
      data = Object.keys(groupedByWeek).map((key) => ({
        name: key,
        amount: groupedByWeek[key],
      }));
    } else {
      // Group by month
      const groupedByMonth: Record<string, number> = {};
      const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
      
      expenses.forEach((expense) => {
        const date = new Date(expense.date);
        const month = months[date.getMonth()];
        groupedByMonth[month] = (groupedByMonth[month] || 0) + expense.amount;
      });
      
      data = Object.keys(groupedByMonth).map((key) => ({
        name: key,
        amount: groupedByMonth[key],
      }));
    }
    
    return data.sort((a, b) => {
      if (period === "monthly") {
        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun",
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
        return months.indexOf(a.name) - months.indexOf(b.name);
      } else if (period === "weekly") {
        return parseInt(a.name.replace("Week ", "")) - parseInt(b.name.replace("Week ", ""));
      } else {
        return parseInt(a.name.replace("Day ", "")) - parseInt(b.name.replace("Day ", ""));
      }
    });
  };

  const getWeekNumber = (date: Date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    d.setDate(d.getDate() + 4 - (d.getDay() || 7));
    const yearStart = new Date(d.getFullYear(), 0, 1);
    return Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  };

  const data = getAggregatedData();
  const colors = ["#8B5CF6", "#D946EF", "#6366F1", "#0EA5E9", "#10B981"];

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-lg font-medium">Expenses Over Time</CardTitle>
          <CardDescription>Track how your expenses change over time</CardDescription>
        </div>
        <Select value={period} onValueChange={setPeriod}>
          <SelectTrigger className="w-32 bg-secondary/60">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {periodOptions.map((option) => (
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
            <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255, 255, 255, 0.1)" />
              <XAxis 
                dataKey="name" 
                tick={{ fill: "#A1A1AA" }} 
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }} 
              />
              <YAxis 
                tick={{ fill: "#A1A1AA" }} 
                axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip
                formatter={(value) => [`$${value}`, "Amount"]}
                contentStyle={{
                  backgroundColor: "rgba(22, 25, 31, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "#fff",
                }}
              />
              <Bar
                dataKey="amount"
                animationDuration={1500}
                animationBegin={0}
                animationEasing="ease-out"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default BarChartComponent;
