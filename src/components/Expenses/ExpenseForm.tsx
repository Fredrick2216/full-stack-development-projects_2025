import React, { useState, useEffect } from "react";
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
    note?: string;
    currency: string;
  }) => void;
  onCancel?: () => void;
  initialValues?: {
    title: string;
    amount: number;
    category: string;
    date: Date;
    note?: string;
    currency?: string;
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

// Currency symbols mapping
const currencySymbols: Record<string, string> = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  INR: "₹",
  JPY: "¥",
  CAD: "C$",
};

// Available currencies
const currencies = [
  { code: "USD", name: "US Dollar ($)" },
  { code: "EUR", name: "Euro (€)" },
  { code: "GBP", name: "British Pound (£)" },
  { code: "INR", name: "Indian Rupee (₹)" },
  { code: "JPY", name: "Japanese Yen (¥)" },
  { code: "CAD", name: "Canadian Dollar (C$)" },
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
  const [currency, setCurrency] = useState(initialValues?.currency || "USD");
  const [currencySymbol, setCurrencySymbol] = useState(currencySymbols[initialValues?.currency || "USD"] || "$");
  
  // Load user's preferred currency from localStorage for new expenses
  useEffect(() => {
    if (!isEditing) {
      const loadCurrency = () => {
        const savedUserPrefs = localStorage.getItem('userPreferences');
        if (savedUserPrefs) {
          const prefs = JSON.parse(savedUserPrefs);
          if (prefs.currency) {
            setCurrency(prefs.currency);
            setCurrencySymbol(currencySymbols[prefs.currency] || "$");
          }
        }
      };
      
      loadCurrency();
    }
  }, [isEditing]);

  // Update currency symbol when currency changes
  const handleCurrencyChange = (value: string) => {
    setCurrency(value);
    setCurrencySymbol(currencySymbols[value] || "$");
  };

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
        note,
        currency,
      });
      
      // Reset form if not editing
      if (!isEditing) {
        setTitle("");
        setAmount(0);
        setCategory("");
        setDate(new Date());
        setNote("");
        // Keep the selected currency for convenience
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
          
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="amount">Amount</Label>
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
              <Label htmlFor="currency">Currency</Label>
              <Select value={currency} onValueChange={handleCurrencyChange}>
                <SelectTrigger id="currency" className="bg-secondary/60">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((curr) => (
                    <SelectItem key={curr.code} value={curr.code}>
                      {curr.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
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
              <PopoverContent className="w-auto p-0 bg-card">
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
