
import React, { createContext, useContext, useState, useEffect } from "react";

type NotificationPreferences = {
  budgetAlerts: boolean;
  expenseReminders: boolean;
  financialTips: boolean;
  emailNotifications: boolean;
};

type SecurityPreferences = {
  twoFactor: boolean;
};

interface SettingsContextType {
  notificationPreferences: NotificationPreferences;
  securityPreferences: SecurityPreferences;
  updateNotificationPreference: (key: keyof NotificationPreferences, value: boolean) => void;
  updateSecurityPreference: (key: keyof SecurityPreferences, value: boolean) => void;
  // New functionality
  checkBudgetStatus: () => { isOverBudget: boolean; percentUsed: number };
  getUpcomingExpenses: () => Array<{ id: string; title: string; dueDate: string }>;
  requiresTwoFactor: () => boolean;
}

const defaultNotificationPreferences: NotificationPreferences = {
  budgetAlerts: true,
  expenseReminders: true,
  financialTips: false,
  emailNotifications: true,
};

const defaultSecurityPreferences: SecurityPreferences = {
  twoFactor: false,
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [notificationPreferences, setNotificationPreferences] = useState<NotificationPreferences>(
    defaultNotificationPreferences
  );
  const [securityPreferences, setSecurityPreferences] = useState<SecurityPreferences>(
    defaultSecurityPreferences
  );

  // Load settings from localStorage on mount
  useEffect(() => {
    const loadSettings = () => {
      const savedNotificationPrefs = localStorage.getItem('notificationPreferences');
      if (savedNotificationPrefs) {
        setNotificationPreferences(JSON.parse(savedNotificationPrefs));
      }
      
      const savedSecurityPrefs = localStorage.getItem('securityPreferences');
      if (savedSecurityPrefs) {
        setSecurityPreferences(JSON.parse(savedSecurityPrefs));
      }
    };
    
    loadSettings();
  }, []);

  const updateNotificationPreference = (key: keyof NotificationPreferences, value: boolean) => {
    setNotificationPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('notificationPreferences', JSON.stringify(updated));
      return updated;
    });
  };

  const updateSecurityPreference = (key: keyof SecurityPreferences, value: boolean) => {
    setSecurityPreferences(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem('securityPreferences', JSON.stringify(updated));
      return updated;
    });
  };
  
  // New functionality implementation
  const checkBudgetStatus = () => {
    // This would normally query actual expense data and budget data
    // For demo purposes, we'll return mock data
    const budget = 3000;
    const spent = Math.random() * 3500; // Random value for demonstration
    const percentUsed = (spent / budget) * 100;
    const isOverBudget = percentUsed > 100;
    
    // Only return alert data if budgetAlerts is enabled
    if (!notificationPreferences.budgetAlerts) {
      return { isOverBudget: false, percentUsed: 0 };
    }
    
    return { isOverBudget, percentUsed };
  };
  
  const getUpcomingExpenses = () => {
    // This would normally query actual scheduled expenses
    // For demo purposes, we'll return mock data
    const mockExpenses = [
      { id: "exp1", title: "Rent Payment", dueDate: "2025-04-15" },
      { id: "exp2", title: "Car Insurance", dueDate: "2025-04-20" },
      { id: "exp3", title: "Phone Bill", dueDate: "2025-04-25" }
    ];
    
    // Only return expense reminders if expenseReminders is enabled
    if (!notificationPreferences.expenseReminders) {
      return [];
    }
    
    return mockExpenses;
  };
  
  const requiresTwoFactor = () => {
    // Check if two-factor authentication is required based on security preferences
    return securityPreferences.twoFactor;
  };

  return (
    <SettingsContext.Provider
      value={{
        notificationPreferences,
        securityPreferences,
        updateNotificationPreference,
        updateSecurityPreference,
        checkBudgetStatus,
        getUpcomingExpenses,
        requiresTwoFactor,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
