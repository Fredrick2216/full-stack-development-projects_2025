
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, FilePdf, Loader2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadReportButtonProps {
  expenses: any[];
  month?: string;
  year?: number;
  className?: string;
  variant?: "default" | "outline" | "primary" | "secondary";
  weeklyMode?: boolean;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ 
  expenses, 
  month = new Date().toLocaleString('default', { month: 'long' }),
  year = new Date().getFullYear(),
  className = "",
  variant = "outline",
  weeklyMode = false
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [daysRemaining, setDaysRemaining] = useState(0);
  
  useEffect(() => {
    if (!weeklyMode) {
      setIsEnabled(true);
      return;
    }

    // For weekly mode, check if a week has passed since the first expense
    if (expenses.length > 0) {
      const sortedExpenses = [...expenses].sort((a, b) => 
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
      
      const firstExpenseDate = new Date(sortedExpenses[0].date);
      const currentDate = new Date();
      const daysPassed = Math.floor((currentDate.getTime() - firstExpenseDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (daysPassed >= 7) {
        setIsEnabled(true);
        setDaysRemaining(0);
      } else {
        setIsEnabled(false);
        setDaysRemaining(7 - daysPassed);
      }
    } else {
      setIsEnabled(false);
      setDaysRemaining(7);
    }
  }, [expenses, weeklyMode]);
  
  const downloadReport = async () => {
    if (isDownloading || !isEnabled) return;
    
    try {
      setIsDownloading(true);
      
      // Filter expenses for the specified month and year if needed
      let filteredExpenses = expenses;
      
      if (!weeklyMode) {
        filteredExpenses = expenses.filter(expense => {
          const expenseDate = new Date(expense.date);
          const expenseMonth = expenseDate.toLocaleString('default', { month: 'long' });
          const expenseYear = expenseDate.getFullYear();
          
          return expenseMonth === month && expenseYear === year;
        });
      } else {
        // For weekly mode, sort by date and get the most recent week's expenses
        filteredExpenses = [...expenses].sort((a, b) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        ).filter((_, index) => index < 50); // Limit to most recent 50 expenses for performance
      }
      
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      if (weeklyMode) {
        doc.text(`Budget Savvy: Weekly Expense Report`, 14, 22);
      } else {
        doc.text(`Budget Savvy: ${month} ${year} Expense Report`, 14, 22);
      }
      
      // Add date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}`, 14, 30);
      
      // Add expense summary
      const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 14, 38);
      doc.text(`Number of Transactions: ${filteredExpenses.length}`, 14, 46);
      
      // Add expense table
      const tableColumn = ["Date & Time", "Title", "Category", "Amount", "Notes"];
      const tableRows = filteredExpenses.map(expense => [
        `${new Date(expense.date).toLocaleDateString()} ${new Date(expense.date).toLocaleTimeString()}`,
        expense.title,
        expense.category,
        `$${expense.amount.toFixed(2)}`,
        expense.note || "-"
      ]);
      
      autoTable(doc, {
        head: [tableColumn],
        body: tableRows,
        startY: 55,
        theme: 'striped',
        headStyles: { fillColor: [139, 92, 246] },
        margin: { top: 15 },
      });
      
      // Group by category
      const categoryMap = new Map<string, number>();
      filteredExpenses.forEach(expense => {
        const currentAmount = categoryMap.get(expense.category) || 0;
        categoryMap.set(expense.category, currentAmount + expense.amount);
      });
      
      const categoryData = Array.from(categoryMap).map(([category, amount]) => ({
        category,
        amount,
        percentage: (amount / totalExpense) * 100
      }));
      
      // Add category breakdown after the table
      const finalY = (doc as any).lastAutoTable.finalY + 15;
      doc.text("Expense Breakdown by Category:", 14, finalY);
      
      let yPos = finalY + 8;
      categoryData.forEach(cat => {
        doc.text(`${cat.category}: $${cat.amount.toFixed(2)} (${cat.percentage.toFixed(1)}%)`, 20, yPos);
        yPos += 7;
      });
      
      // Add spending insights
      yPos += 10;
      doc.setFontSize(14);
      doc.text("Spending Insights & Recommendations:", 14, yPos);
      yPos += 8;
      doc.setFontSize(11);
      
      // Top category insight
      const topCategory = categoryData.sort((a, b) => b.amount - a.amount)[0];
      if (topCategory) {
        doc.text(`• Your highest spending category is ${topCategory.category} at $${topCategory.amount.toFixed(2)}.`, 20, yPos);
        yPos += 7;
      }
      
      // Weekly trend insight (if applicable)
      if (weeklyMode && filteredExpenses.length > 0) {
        doc.text(`• Weekly spending average: $${(totalExpense / 7).toFixed(2)} per day.`, 20, yPos);
        yPos += 7;
      }
      
      // General recommendations
      doc.text(`• Consider reviewing your ${topCategory?.category || 'top'} expenses for potential savings.`, 20, yPos);
      yPos += 7;
      
      // Security note
      yPos += 10;
      doc.setFontSize(9);
      doc.setTextColor(120);
      doc.text("This report contains confidential financial information. For your eyes only.", 14, yPos);
      
      // Save the PDF
      if (weeklyMode) {
        doc.save(`budget-savvy-weekly-report-${new Date().toISOString().slice(0, 10)}.pdf`);
        toast.success(`Weekly expense report successfully downloaded!`);
      } else {
        doc.save(`budget-savvy-report-${month.toLowerCase()}-${year}.pdf`);
        toast.success(`${month} ${year} expense report successfully downloaded!`);
      }
    } catch (error: any) {
      console.error("PDF generation error:", error);
      toast.error(`Failed to download report: ${error.message || "Unknown error"}`);
    } finally {
      setIsDownloading(false);
    }
  };
  
  return (
    <Button 
      onClick={downloadReport} 
      variant={variant as any}
      disabled={!isEnabled}
      className={`gap-2 ${!isEnabled ? 'opacity-70 cursor-not-allowed' : 'bg-space-purple/10 hover:bg-space-purple/20 text-space-purple border-space-purple/30'} ${className}`}
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <FilePdf className="h-4 w-4" />
      )}
      {weeklyMode ? (
        isEnabled ? 
          "Download Weekly Report" : 
          `Report available in ${daysRemaining} day${daysRemaining !== 1 ? 's' : ''}`
      ) : (
        `Download ${month} Report`
      )}
    </Button>
  );
};

export default DownloadReportButton;
