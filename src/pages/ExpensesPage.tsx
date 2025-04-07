
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import ExpenseForm from "@/components/Expenses/ExpenseForm";
import ExpensesList, { Expense } from "@/components/Expenses/ExpensesList";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState<Expense | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  // Check if user is authenticated
  useEffect(() => {
    const checkUser = async () => {
      const { data } = await supabase.auth.getSession();
      const user = data.session?.user;
      
      if (!user) {
        toast.error("Please login to view your expenses");
        navigate("/auth");
        return;
      }
      
      setUser(user);
      fetchExpenses(user.id);
    };
    
    checkUser();
  }, [navigate]);

  // Fetch expenses from Supabase
  const fetchExpenses = async (userId: string) => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("expenses")
        .select("*")
        .eq("user_id", userId)
        .order('date', { ascending: false });

      if (error) throw error;

      // Transform expenses to match our application's format
      const formattedExpenses = data.map(expense => ({
        id: expense.id,
        title: expense.title,
        amount: parseFloat(expense.amount),
        category: expense.category,
        date: new Date(expense.date),
        note: expense.note || undefined
      }));

      setExpenses(formattedExpenses);
    } catch (error: any) {
      toast.error(`Failed to fetch expenses: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleAddExpense = async (newExpense: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;
  }) => {
    try {
      if (!user) {
        toast.error("Please login to add expenses");
        return;
      }

      const expenseToAdd = {
        user_id: user.id,
        title: newExpense.title,
        amount: newExpense.amount,
        category: newExpense.category,
        date: newExpense.date.toISOString(),
        note: newExpense.note || null
      };

      const { data, error } = await supabase
        .from("expenses")
        .insert(expenseToAdd)
        .select()
        .single();

      if (error) throw error;

      const addedExpense: Expense = {
        id: data.id,
        title: data.title,
        amount: parseFloat(data.amount),
        category: data.category,
        date: new Date(data.date),
        note: data.note || undefined
      };
      
      setExpenses((prev) => [addedExpense, ...prev]);
      setIsAddDialogOpen(false);
      toast.success("Expense added successfully!");
    } catch (error: any) {
      toast.error(`Failed to add expense: ${error.message}`);
    }
  };

  const handleEditExpense = (expense: Expense) => {
    setCurrentExpense(expense);
    setIsEditDialogOpen(true);
  };

  const handleUpdateExpense = async (updatedExpense: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;
  }) => {
    if (!currentExpense || !user) return;
    
    try {
      const expenseToUpdate = {
        title: updatedExpense.title,
        amount: updatedExpense.amount,
        category: updatedExpense.category,
        date: updatedExpense.date.toISOString(),
        note: updatedExpense.note || null
      };

      const { error } = await supabase
        .from("expenses")
        .update(expenseToUpdate)
        .eq("id", currentExpense.id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      setExpenses((prev) =>
        prev.map((exp) =>
          exp.id === currentExpense.id ? { ...updatedExpense, id: exp.id } : exp
        )
      );
      
      setIsEditDialogOpen(false);
      setCurrentExpense(null);
      toast.success("Expense updated successfully!");
    } catch (error: any) {
      toast.error(`Failed to update expense: ${error.message}`);
    }
  };

  const handleDeleteExpense = async (id: string | number) => {
    if (!user) return;
    
    if (confirm("Are you sure you want to delete this expense?")) {
      try {
        const { error } = await supabase
          .from("expenses")
          .delete()
          .eq("id", id)
          .eq("user_id", user.id);

        if (error) throw error;
        
        setExpenses((prev) => prev.filter((exp) => exp.id !== id));
        toast.success("Expense deleted successfully");
      } catch (error: any) {
        toast.error(`Failed to delete expense: ${error.message}`);
      }
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
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-space-purple" />
              <span className="ml-2 text-lg">Loading your expenses...</span>
            </div>
          ) : (
            <ExpensesList
              expenses={expenses}
              onEdit={handleEditExpense}
              onDelete={handleDeleteExpense}
            />
          )}

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
