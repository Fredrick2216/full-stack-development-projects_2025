
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

  return (
    <SettingsContext.Provider
      value={{
        notificationPreferences,
        securityPreferences,
        updateNotificationPreference,
        updateSecurityPreference,
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
