"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  CreditCard,
  Brain,
  Settings,
  BarChart3,
  HelpCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Users", href: "/users", icon: Users },
  { name: "Subscriptions", href: "/subscriptions", icon: CreditCard },
  { name: "AI Management", href: "/ai-management", icon: Brain },
  { name: "Configuration", href: "/configuration", icon: Settings },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
  { name: "Support", href: "/support", icon: HelpCircle },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="hidden md:flex md:w-64 md:flex-col">
      <div className="flex flex-col flex-grow pt-5 bg-card border-r overflow-y-auto">
        <div className="flex items-center flex-shrink-0 px-4">
          <div className="flex items-center">
            <div className="p-2 rounded-lg bg-primary/10">
              <Brain className="h-6 w-6 text-primary" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-semibold text-foreground">
                Expenvisor
              </h1>
              <p className="text-xs text-muted-foreground">Admin Panel</p>
            </div>
          </div>
        </div>

        <div className="mt-8 flex-grow flex flex-col">
          <nav className="flex-1 px-2 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  )}
                >
                  <item.icon
                    className={cn(
                      "mr-3 flex-shrink-0 h-5 w-5",
                      isActive
                        ? "text-primary-foreground"
                        : "text-muted-foreground group-hover:text-foreground"
                    )}
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex-shrink-0 flex border-t border-border p-4">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-sm font-medium text-primary">A</span>
              </div>
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-foreground">Admin User</p>
              <p className="text-xs text-muted-foreground">Super Admin</p>
            </div>
          </div>
          <button className="ml-auto p-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent">
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
