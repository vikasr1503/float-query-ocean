import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLocation, useNavigate } from "react-router-dom";
import { Waves, MessageCircle, BarChart3, Bell, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavigationProps {
  currentRole?: "Scientist" | "Policymaker" | "Student";
  onRoleChange?: (role: "Scientist" | "Policymaker" | "Student") => void;
}

export const Navigation = ({ currentRole = "Scientist", onRoleChange }: NavigationProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { path: "/", label: "Home", icon: Waves },
    { path: "/chat", label: "FloatChat", icon: MessageCircle },
    { path: "/dashboard", label: "Dashboard", icon: BarChart3 },
    { path: "/alerts", label: "Alerts", icon: Bell, badge: "2" },
  ];

  const roleColors = {
    Scientist: "bg-primary",
    Policymaker: "bg-accent", 
    Student: "bg-success"
  };

  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer transition-ocean hover:scale-105"
            onClick={() => navigate("/")}
          >
            <div className="relative">
              <Waves className="h-8 w-8 text-primary animate-wave" />
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-ripple" />
            </div>
            <span className="text-xl font-bold gradient-ocean bg-clip-text text-transparent">
              FloatChat
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-ocean",
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                  )}
                >
                  <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="ml-1 h-5 w-5 p-0 text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </button>
              );
            })}
          </div>

          {/* Role Selector & User */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <select
                value={currentRole}
                onChange={(e) => onRoleChange?.(e.target.value as any)}
                className="bg-background border border-input rounded-md px-3 py-1 text-sm transition-ocean focus:ring-2 focus:ring-ring"
              >
                <option value="Scientist">Scientist</option>
                <option value="Policymaker">Policymaker</option>
                <option value="Student">Student</option>
              </select>
              <div className={cn("w-3 h-3 rounded-full", roleColors[currentRole])} />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent transition-ocean"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border animate-fade-in">
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                
                return (
                  <button
                    key={item.path}
                    onClick={() => {
                      navigate(item.path);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-ocean",
                      isActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", isActive && "text-primary")} />
                    <span>{item.label}</span>
                    {item.badge && (
                      <Badge variant="destructive" className="ml-auto h-5 w-5 p-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                  </button>
                );
              })}
              
              {/* Mobile Role Selector */}
              <div className="px-3 py-2 border-t border-border mt-4 pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Role:</span>
                  <select
                    value={currentRole}
                    onChange={(e) => onRoleChange?.(e.target.value as any)}
                    className="bg-background border border-input rounded-md px-2 py-1 text-sm"
                  >
                    <option value="Scientist">Scientist</option>
                    <option value="Policymaker">Policymaker</option>
                    <option value="Student">Student</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};