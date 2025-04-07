
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

interface ExpenseChartProps {
  data: ExpenseCategory[];
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ data }) => {
  const total = data.reduce((sum, category) => sum + category.value, 0);

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20 hover:border-space-purple/30 transition-all duration-300">
      <CardHeader className="pb-0">
        <CardTitle className="text-lg font-medium">Expense Categories</CardTitle>
        <CardDescription>Breakdown of your spending by category</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
                animationDuration={800}
                animationBegin={0}
                animationEasing="ease-in-out"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`$${value}`, ""]}
                contentStyle={{
                  backgroundColor: "rgba(22, 25, 31, 0.9)",
                  borderRadius: "0.5rem",
                  border: "1px solid rgba(139, 92, 246, 0.3)",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 pt-4">
          {data.map((category, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <div className="flex flex-col">
                <p className="text-sm font-medium leading-none">
                  {category.name}
                </p>
                <p className="text-xs text-muted-foreground">{((category.value / total) * 100).toFixed(0)}%</p>
              </div>
              <p className="ml-auto text-sm">${category.value}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpenseChart;
