
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface Expense {
  id: number;
  title: string;
  amount: number;
  category: string;
  date: Date | string;
}

interface CategoryDistributionProps {
  expenses: Expense[];
}

const COLORS = [
  "#8B5CF6", // Purple
  "#D946EF", // Pink
  "#6366F1", // Indigo
  "#0EA5E9", // Blue
  "#10B981", // Green
  "#F59E0B", // Amber
  "#EF4444", // Red
  "#64748B", // Slate
  "#8B5CF6", // Purple (repeat with variations)
  "#D946EF", // Pink (repeat with variations)
];

const CategoryDistribution: React.FC<CategoryDistributionProps> = ({ expenses }) => {
  const calculateCategoryData = () => {
    const categoryMap = new Map<string, number>();

    expenses.forEach((expense) => {
      const currentAmount = categoryMap.get(expense.category) || 0;
      categoryMap.set(expense.category, currentAmount + expense.amount);
    });

    return Array.from(categoryMap).map(([category, amount]) => ({
      name: category,
      value: amount,
    }));
  };

  const data = calculateCategoryData();
  const total = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader>
        <CardTitle className="text-lg font-medium">Category Distribution</CardTitle>
        <CardDescription>How your expenses are divided among categories</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
                animationDuration={1000}
                animationBegin={0}
                animationEasing="ease-out"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={{ stroke: "rgba(255, 255, 255, 0.3)", strokeWidth: 1 }}
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${typeof value === 'number' ? value.toFixed(2) : value}`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(22, 25, 31, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "#fff",
                }}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          {data.slice(0, 6).map((entry, index) => (
            <div key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <div
                  className="h-3 w-3 rounded-full mr-2"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <span className="text-sm">{entry.name}</span>
              </div>
              <span className="text-sm font-medium">{((entry.value / total) * 100).toFixed(1)}%</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CategoryDistribution;
