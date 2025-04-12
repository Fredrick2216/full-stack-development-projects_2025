
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface DownloadReportButtonProps {
  expenses: any[];
  month?: string;
  year?: number;
}

const DownloadReportButton: React.FC<DownloadReportButtonProps> = ({ 
  expenses, 
  month = new Date().toLocaleString('default', { month: 'long' }),
  year = new Date().getFullYear()
}) => {
  const [isDownloading, setIsDownloading] = useState(false);
  
  const downloadReport = async () => {
    if (isDownloading) return;
    
    try {
      setIsDownloading(true);
      
      // Filter expenses for the specified month and year if needed
      const filteredExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        const expenseMonth = expenseDate.toLocaleString('default', { month: 'long' });
        const expenseYear = expenseDate.getFullYear();
        
        return expenseMonth === month && expenseYear === year;
      });
      
      // Create a new PDF document
      const doc = new jsPDF();
      
      // Add title
      doc.setFontSize(18);
      doc.text(`Budget Savvy: ${month} ${year} Expense Report`, 14, 22);
      
      // Add date
      doc.setFontSize(11);
      doc.setTextColor(100);
      doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
      
      // Add expense summary
      const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
      doc.text(`Total Expenses: $${totalExpense.toFixed(2)}`, 14, 38);
      doc.text(`Number of Transactions: ${filteredExpenses.length}`, 14, 46);
      
      // Add expense table
      const tableColumn = ["Date", "Title", "Category", "Amount"];
      const tableRows = filteredExpenses.map(expense => [
        new Date(expense.date).toLocaleDateString(),
        expense.title,
        expense.category,
        `$${expense.amount.toFixed(2)}`
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
      
      // Save the PDF
      doc.save(`budget-savvy-report-${month.toLowerCase()}-${year}.pdf`);
      
      toast.success(`${month} ${year} expense report successfully downloaded!`);
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
      variant="outline"
      className="gap-2 bg-space-purple/10 hover:bg-space-purple/20 text-space-purple border-space-purple/30"
    >
      {isDownloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      Download {month} Report
    </Button>
  );
};

export default DownloadReportButton;
