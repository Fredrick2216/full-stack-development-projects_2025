
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface Expense {
  id: string | number;  // Updated type to handle UUID from Supabase
  title: string;
  amount: number;
  category: string;
  date: Date | string;
  note?: string;
}

interface ExpensesListProps {
  expenses: Expense[];
  onEdit: (expense: Expense) => void;
  onDelete: (id: string | number) => void;  // Updated type to handle UUID from Supabase
}

const ExpensesList: React.FC<ExpensesListProps> = ({
  expenses,
  onEdit,
  onDelete,
}) => {
  const [searchTerm, setSearchTerm] = React.useState("");

  const filteredExpenses = expenses.filter(
    (expense) =>
      expense.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (expense.note && expense.note.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const formatDate = (date: Date | string): string => {
    if (typeof date === "string") {
      return new Date(date).toLocaleDateString();
    }
    return date.toLocaleDateString();
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-xl">Your Expenses</CardTitle>
        <div className="relative w-64">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search expenses..."
            className="pl-8 bg-secondary/60"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-3 text-sm font-medium text-muted-foreground">Title</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Category</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Amount</th>
                <th className="pb-3 text-sm font-medium text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredExpenses.length > 0 ? (
                filteredExpenses.map((expense) => (
                  <tr key={expense.id} className="border-b border-border hover:bg-secondary/20">
                    <td className="py-3 text-sm">{expense.title}</td>
                    <td className="py-3 text-sm">{expense.category}</td>
                    <td className="py-3 text-sm">{formatDate(expense.date)}</td>
                    <td className="py-3 text-sm text-right font-medium">${expense.amount.toFixed(2)}</td>
                    <td className="py-3 text-sm text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEdit(expense)}
                          className="hover:bg-secondary/60 h-8 w-8"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onDelete(expense.id)}
                          className="hover:bg-destructive/20 hover:text-destructive h-8 w-8"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-6 text-center text-muted-foreground">
                    {searchTerm
                      ? "No expenses match your search"
                      : "No expenses yet. Add your first one!"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ExpensesList;
