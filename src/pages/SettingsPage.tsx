
import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import StarField from "@/components/StarField";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

const SettingsPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("account");
  const [user, setUser] = useState<any>(null);
  
  // Profile state
  const [firstName, setFirstName] = useState("John");
  const [lastName, setLastName] = useState("Doe");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  
  // Notification state
  const [budgetAlerts, setBudgetAlerts] = useState(true);
  const [expenseReminders, setExpenseReminders] = useState(true);
  const [financialTips, setFinancialTips] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  
  // Security state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactor, setTwoFactor] = useState(false);

  // Fetch user on mount
  useEffect(() => {
    const getUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setEmail(session.user.email || "");
      } else {
        navigate('/auth');
      }
    };
    
    getUser();
  }, [navigate]);

  // Handle profile update
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Store user preferences in database or localStorage
      localStorage.setItem('userPreferences', JSON.stringify({
        firstName,
        lastName,
        currency
      }));
      
      toast.success("Profile updated successfully!");
    } catch (error: any) {
      toast.error(`Failed to update profile: ${error.message}`);
    }
  };

  // Handle notification preferences update
  const handleSaveNotifications = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Store notification preferences in database or localStorage
      localStorage.setItem('notificationPreferences', JSON.stringify({
        budgetAlerts,
        expenseReminders,
        financialTips,
        emailNotifications
      }));
      
      toast.success("Notification preferences updated!");
    } catch (error: any) {
      toast.error(`Failed to update notification preferences: ${error.message}`);
    }
  };

  // Handle password update
  const handleSaveSecurity = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentPassword) {
      toast.error("Please enter your current password");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast.error("New passwords don't match");
      return;
    }
    
    if (newPassword.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    
    try {
      const { error } = await supabase.auth.updateUser({ 
        password: newPassword 
      });
      
      if (error) throw error;
      
      // Also update two-factor preference if needed
      localStorage.setItem('securityPreferences', JSON.stringify({
        twoFactor
      }));
      
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      toast.success("Password updated successfully!");
    } catch (error: any) {
      toast.error(`Failed to update password: ${error.message}`);
    }
  };
  
  // Handle logout
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/auth');
      toast.success("Logged out successfully");
    } catch (error: any) {
      toast.error(`Failed to log out: ${error.message}`);
    }
  };

  // Load preferences from localStorage on component mount
  useEffect(() => {
    // Load user preferences
    const savedUserPrefs = localStorage.getItem('userPreferences');
    if (savedUserPrefs) {
      const prefs = JSON.parse(savedUserPrefs);
      setFirstName(prefs.firstName || firstName);
      setLastName(prefs.lastName || lastName);
      setCurrency(prefs.currency || currency);
    }
    
    // Load notification preferences
    const savedNotificationPrefs = localStorage.getItem('notificationPreferences');
    if (savedNotificationPrefs) {
      const prefs = JSON.parse(savedNotificationPrefs);
      setBudgetAlerts(prefs.budgetAlerts);
      setExpenseReminders(prefs.expenseReminders);
      setFinancialTips(prefs.financialTips);
      setEmailNotifications(prefs.emailNotifications);
    }
    
    // Load security preferences
    const savedSecurityPrefs = localStorage.getItem('securityPreferences');
    if (savedSecurityPrefs) {
      const prefs = JSON.parse(savedSecurityPrefs);
      setTwoFactor(prefs.twoFactor);
    }
  }, []);

  return (
    <div className="min-h-screen w-full space-bg animate-space flex">
      <StarField />
      <Sidebar className="w-64 min-w-64" />
      
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-6">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
            <p className="text-muted-foreground">Manage your account preferences</p>
          </div>
          
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid grid-cols-3 max-w-md">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            
            <TabsContent value="account">
              <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveProfile} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                          className="bg-secondary/60" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                          className="bg-secondary/60" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)}
                        className="bg-secondary/60" 
                        disabled={true}  // Email can't be changed directly
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="currency">Preferred Currency</Label>
                      <select 
                        id="currency" 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full rounded-md bg-secondary/60 border border-input p-2"
                      >
                        <option value="USD">US Dollar ($)</option>
                        <option value="EUR">Euro (€)</option>
                        <option value="GBP">British Pound (£)</option>
                        <option value="JPY">Japanese Yen (¥)</option>
                        <option value="CAD">Canadian Dollar (C$)</option>
                      </select>
                    </div>
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-space-purple hover:bg-space-purple/90">
                        Save Profile
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="notifications">
              <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Control how you receive notifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveNotifications} className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="budget-alerts">Budget Alerts</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications when you're approaching your budget limits</p>
                        </div>
                        <Switch 
                          id="budget-alerts" 
                          checked={budgetAlerts} 
                          onCheckedChange={setBudgetAlerts} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="expense-reminders">Expense Reminders</Label>
                          <p className="text-sm text-muted-foreground">Get reminders about recurring expenses before they're due</p>
                        </div>
                        <Switch 
                          id="expense-reminders" 
                          checked={expenseReminders} 
                          onCheckedChange={setExpenseReminders} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="tips">Financial Tips</Label>
                          <p className="text-sm text-muted-foreground">Receive occasional tips about financial management</p>
                        </div>
                        <Switch 
                          id="tips" 
                          checked={financialTips} 
                          onCheckedChange={setFinancialTips} 
                        />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <Label htmlFor="email-notifications">Email Notifications</Label>
                          <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                        </div>
                        <Switch 
                          id="email-notifications" 
                          checked={emailNotifications} 
                          onCheckedChange={setEmailNotifications} 
                        />
                      </div>
                    </div>
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-space-purple hover:bg-space-purple/90">
                        Save Preferences
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="security">
              <Card className="bg-card/90 backdrop-blur-sm border-space-purple/20">
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <CardDescription>Manage your account security</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSaveSecurity} className="space-y-6">
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="current-password">Current Password</Label>
                        <Input 
                          id="current-password" 
                          type="password" 
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="bg-secondary/60" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="new-password">New Password</Label>
                        <Input 
                          id="new-password" 
                          type="password" 
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="bg-secondary/60" 
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirm-password">Confirm New Password</Label>
                        <Input 
                          id="confirm-password" 
                          type="password" 
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="bg-secondary/60" 
                        />
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch 
                          id="two-factor" 
                          checked={twoFactor}
                          onCheckedChange={setTwoFactor}
                        />
                        <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                      </div>
                    </div>
                    
                    <div className="flex justify-between">
                      <Button 
                        type="button" 
                        variant="destructive" 
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-space-purple hover:bg-space-purple/90"
                      >
                        Update Password
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
