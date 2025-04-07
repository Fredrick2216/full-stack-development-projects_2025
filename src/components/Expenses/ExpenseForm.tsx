
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ExpenseFormProps {
  onSubmit: (expense: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;  // Changed from required to optional
  }) => void;
  onCancel?: () => void;
  initialValues?: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;  // Changed from required to optional
  };
  isEditing?: boolean;
}

const categories = [
  "Food",
  "Transportation",
  "Entertainment",
  "Shopping",
  "Housing",
  "Utilities",
  "Healthcare",
  "Education",
  "Travel",
  "Coffee",
  "Groceries",
  "Electronics",
];

const ExpenseForm: React.FC<ExpenseFormProps> = ({
  onSubmit,
  onCancel,
  initialValues,
  isEditing = false,
}) => {
  const [title, setTitle] = useState(initialValues?.title || "");
  const [amount, setAmount] = useState(initialValues?.amount || 0);
  const [category, setCategory] = useState(initialValues?.category || "");
  const [date, setDate] = useState<Date>(initialValues?.date || new Date());
  const [note, setNote] = useState(initialValues?.note || "");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) {
      toast.error("Please fill out all required fields");
      return;
    }

    setSubmitting(true);
    
    try {
      onSubmit({
        title,
        amount: parseFloat(amount.toString()),
        category,
        date,
        note, // This will be an empty string if not provided
      });
      
      // Reset form if not editing
      if (!isEditing) {
        setTitle("");
        setAmount(0);
        setCategory("");
        setDate(new Date());
        setNote("");
      }
      
      toast.success(isEditing ? "Expense updated successfully!" : "Expense added successfully!");
    } catch (error) {
      toast.error("Failed to save expense. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
      <CardHeader>
        <CardTitle>{isEditing ? "Edit Expense" : "Add New Expense"}</CardTitle>
        <CardDescription>
          {isEditing
            ? "Update your expense details"
            : "Track your spending by adding a new expense"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Expense title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="bg-secondary/60"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="amount">Amount ($)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(parseFloat(e.target.value))}
              className="bg-secondary/60"
              required
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger id="category" className="bg-secondary/60">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="date">Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant={"outline"}
                  className={cn(
                    "justify-start text-left font-normal bg-secondary/60",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(date) => date && setDate(date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="note">Note (Optional)</Label>
            <Input
              id="note"
              placeholder="Add a note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="bg-secondary/60"
            />
          </div>
          
          <div className="flex justify-end space-x-2 pt-4">
            {onCancel && (
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={submitting}
                className="border-space-purple/20"
              >
                Cancel
              </Button>
            )}
            <Button
              type="submit"
              disabled={submitting}
              className="bg-space-purple hover:bg-space-purple/90"
            >
              {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Update Expense" : "Add Expense"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default ExpenseForm;
