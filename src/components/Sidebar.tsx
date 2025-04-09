
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { 
  Home,
  CreditCard,
  PieChart,
  BarChart2,
  Settings,
  LogOut,
  MessageCircle
} from "lucide-react";

interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className }) => {
  const location = useLocation();
  const pathname = location.pathname;

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    {
      icon: <Home className="h-5 w-5" />,
      text: "Dashboard",
      href: "/dashboard",
    },
    {
      icon: <CreditCard className="h-5 w-5" />,
      text: "Expenses",
      href: "/expenses",
    },
    {
      icon: <PieChart className="h-5 w-5" />,
      text: "Reports",
      href: "/reports",
    },
    {
      icon: <MessageCircle className="h-5 w-5" />,
      text: "Assistant",
      href: "/assistant",
    },
    {
      icon: <Settings className="h-5 w-5" />,
      text: "Settings",
      href: "/settings",
    },
  ];

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border",
        className
      )}
    >
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="relative">
            <div className="h-8 w-8 rounded-full bg-space-purple flex items-center justify-center text-white font-bold">
              BS
            </div>
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-sidebar"></span>
          </div>
          <div>
            <h2 className="font-semibold text-lg">Budget Savvy</h2>
            <p className="text-xs text-sidebar-foreground/70">Financial Tracker</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:text-sidebar-foreground",
                isActive(item.href)
                  ? "bg-sidebar-accent text-sidebar-foreground font-medium"
                  : "hover:bg-sidebar-accent/50"
              )}
            >
              {item.icon}
              <span>{item.text}</span>
              {item.text === "Assistant" && (
                <span className="ml-auto text-xs bg-space-accent/80 text-white px-1.5 py-0.5 rounded-full">
                  New
                </span>
              )}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-sidebar-border mt-auto">
        <Link
          to="/"
          className="flex items-center gap-3 rounded-lg px-3 py-2 text-sidebar-foreground transition-all hover:bg-sidebar-accent/50"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
