
import React, { useEffect } from "react";
import { useSettings } from "@/context/SettingsContext";
import { AlertCircle, Bell, ShieldCheck, PieChart } from "lucide-react";
import { toast } from "sonner";

export const SettingEffectDisplay: React.FC = () => {
  const { notificationPreferences, securityPreferences } = useSettings();
  
  // Demonstrate financial tips functionality
  useEffect(() => {
    if (notificationPreferences.financialTips) {
      // This would normally be based on user spending patterns
      const financialTip = setTimeout(() => {
        toast.info("Financial Tip", {
          description: "Setting up automatic transfers to savings can help you reach your goals faster.",
        });
      }, 15000); // Show after 15 seconds if enabled
      
      return () => clearTimeout(financialTip);
    }
  }, [notificationPreferences.financialTips]);
  
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2">
      {notificationPreferences.budgetAlerts && (
        <div className="bg-green-500/90 text-white p-2 rounded-md text-xs flex items-center">
          <PieChart className="h-3 w-3 mr-1" />
          Budget alerts active
        </div>
      )}
      {notificationPreferences.expenseReminders && (
        <div className="bg-blue-500/90 text-white p-2 rounded-md text-xs flex items-center">
          <Bell className="h-3 w-3 mr-1" />
          Expense reminders active
        </div>
      )}
      {notificationPreferences.financialTips && (
        <div className="bg-purple-500/90 text-white p-2 rounded-md text-xs flex items-center">
          <AlertCircle className="h-3 w-3 mr-1" />
          Financial tips active
        </div>
      )}
      {securityPreferences.twoFactor && (
        <div className="bg-amber-500/90 text-white p-2 rounded-md text-xs flex items-center">
          <ShieldCheck className="h-3 w-3 mr-1" />
          Two-factor authentication enabled
        </div>
      )}
    </div>
  );
};

export default SettingEffectDisplay;
