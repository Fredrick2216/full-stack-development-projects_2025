
import React, { useState } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import ExpenseForm from "@/components/Expenses/ExpenseForm";
import ExpensesList, { Expense } from "@/components/Expenses/ExpensesList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";

// Mock initial expenses data
const initialExpenses: Expense[] = [
  {
    id: 1,
    title: "Grocery Shopping",
    amount: 85.75,
    category: "Groceries",
    date: new Date("2023-06-15"),
    note: "Weekly groceries from Trader Joe's",
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
    note: "Monthly subscription",
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
    title: "Dinner with Friends",
    amount: 65.30,
    category: "Food",
    date: new Date("2023-06-08"),
    note: "Italian restaurant",
  },
];

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);

  const handleAddExpense = (newExpense: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;
  }) => {
    const expenseToAdd: Expense = {
      id: Date.now(),
      ...newExpense,
    };
    
    setExpenses((prev) => [expenseToAdd, ...prev]);
    setIsAddDialogOpen(false);
  };

  const handleEditExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleUpdateExpense = (updatedExpense: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;
  }) => {
    if (!currentExpense) return;
    
    setExpenses((prev) =>
      prev.map((exp) =>
        exp.id === currentExpense.id ? { ...updatedExpense, id: exp.id } : exp
      )
    );
    
    setIsEditDialogOpen(false);
    setCurrentExpense(null);
  };

  const handleDeleteExpense = (id: number) => {
    if (confirm("Are you sure you want to delete this expense?")) {
      setExpenses((prev) => prev.filter((exp) => exp.id !== id));
      toast.success("Expense deleted successfully");
    }
  };

  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Expenses</h1>
              <p className="text-muted-foreground">Manage and track your spending</p>
            </div>
            <button
              onClick={() => setIsAddDialogOpen(true)}
              className="bg-space-purple hover:bg-space-purple/90 text-white py-2 px-4 rounded-lg flex items-center gap-2"
            >
              <span>Add Expense</span>
            </button>
          </div>
          
          <ExpensesList
            expenses={expenses}
            onEdit={handleEditExpense}
            onDelete={handleDeleteExpense}
          />

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogContent className="max-w-md">
              <ExpenseForm
                onSubmit={handleAddExpense}
                onCancel={() => setIsAddDialogOpen(false)}
              />
            </DialogContent>
          </Dialog>

          <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="max-w-md">
              {currentExpense && (
                <ExpenseForm
                  onSubmit={handleUpdateExpense}
                  onCancel={() => setIsEditDialogOpen(false)}
                  initialValues={{
                    ...currentExpense,
                    date: typeof currentExpense.date === 'string' 
                      ? new Date(currentExpense.date) 
                      : currentExpense.date
                  }}
                  isEditing={true}
                />
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};

export default ExpensesPage;
