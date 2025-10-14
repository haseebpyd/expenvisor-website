"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sidebar } from "@/components/Sidebar";
import {
  ArrowLeft,
  Mail,
  Calendar,
  CreditCard,
  Activity,
  Settings,
  UserX,
  Shield,
  Download,
} from "lucide-react";
import { formatDate, formatCurrency, getInitials } from "@/lib/utils";

// Mock data for demonstration
const mockUser = {
  id: "1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1 (555) 123-4567",
  subscription: "Premium",
  joinDate: "2024-01-15",
  lastActive: "2024-10-14",
  lastLogin: "2024-10-14T10:30:00Z",
  totalExpenses: 1250,
  totalIncome: 8500,
  aiUsage: 45,
  status: "active",
  deviceInfo: "iPhone 14 Pro, iOS 17.1",
  location: "New York, NY",
  recentExpenses: [
    {
      id: "1",
      amount: 25.5,
      category: "Food",
      date: "2024-10-14",
      description: "Lunch at McDonald's",
    },
    {
      id: "2",
      amount: 89.99,
      category: "Shopping",
      date: "2024-10-13",
      description: "Amazon purchase",
    },
    {
      id: "3",
      amount: 15.0,
      category: "Transport",
      date: "2024-10-12",
      description: "Uber ride",
    },
  ],
  recentIncome: [
    {
      id: "1",
      amount: 5000,
      source: "Salary",
      date: "2024-10-01",
      description: "Monthly salary",
    },
    {
      id: "2",
      amount: 250,
      source: "Freelance",
      date: "2024-10-10",
      description: "Design project",
    },
  ],
  subscriptionHistory: [
    { plan: "Free", startDate: "2024-01-15", endDate: "2024-02-15" },
    { plan: "Standard", startDate: "2024-02-15", endDate: "2024-06-15" },
    { plan: "Premium", startDate: "2024-06-15", endDate: null },
  ],
};

export default function UserDetailsPage({
  params: _params,
}: {
  params: { id: string };
}) {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: Settings },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "usage", label: "Usage Stats", icon: Activity },
    { id: "activity", label: "Activity", icon: Calendar },
    { id: "actions", label: "Actions", icon: Shield },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success bg-success/10";
      case "inactive":
        return "text-warning bg-warning/10";
      case "suspended":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getSubscriptionColor = (subscription: string) => {
    switch (subscription) {
      case "Premium":
        return "text-primary bg-primary/10";
      case "Standard":
        return "text-secondary bg-secondary/10";
      case "Free":
        return "text-muted-foreground bg-muted";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="border-b bg-card">
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Users
                </Button>
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    User Details
                  </h1>
                  <p className="text-muted-foreground">
                    Manage user account and settings
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" size="sm">
                  <Mail className="h-4 w-4 mr-2" />
                  Send Email
                </Button>
                <Button variant="destructive" size="sm">
                  <UserX className="h-4 w-4 mr-2" />
                  Suspend User
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* User Header */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">
                      {getInitials(mockUser.name)}
                    </span>
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold">{mockUser.name}</h2>
                    <p className="text-muted-foreground">{mockUser.email}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          mockUser.status
                        )}`}
                      >
                        {mockUser.status}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(
                          mockUser.subscription
                        )}`}
                      >
                        {mockUser.subscription}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right text-sm text-muted-foreground">
                  <p>Member since {formatDate(mockUser.joinDate)}</p>
                  <p>Last active {formatDate(mockUser.lastActive)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tabs */}
          <div className="flex space-x-1 mb-6">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-accent"
                  }`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          {activeTab === "profile" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                  <CardDescription>
                    Basic user details and contact information
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Full Name
                    </label>
                    <Input value={mockUser.name} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Email
                    </label>
                    <Input value={mockUser.email} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Phone
                    </label>
                    <Input value={mockUser.phone} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Location
                    </label>
                    <Input value={mockUser.location} readOnly />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Device
                    </label>
                    <Input value={mockUser.deviceInfo} readOnly />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Account Status</CardTitle>
                  <CardDescription>
                    Current account status and security
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Account Status</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        mockUser.status
                      )}`}
                    >
                      {mockUser.status}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Two-Factor Auth</span>
                    <span className="text-sm text-success">Enabled</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Last Login</span>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(mockUser.lastLogin)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Email Verified</span>
                    <span className="text-sm text-success">Yes</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "subscription" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Current Subscription</CardTitle>
                  <CardDescription>
                    Active subscription details and billing
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {mockUser.subscription} Plan
                      </h3>
                      <p className="text-muted-foreground">
                        Active since{" "}
                        {formatDate(mockUser.subscriptionHistory[2].startDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {formatCurrency(9.99)}/month
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Next billing: Nov 15, 2024
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Subscription History</CardTitle>
                  <CardDescription>
                    Previous subscription changes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.subscriptionHistory.map((sub, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{sub.plan} Plan</p>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(sub.startDate)} -{" "}
                            {sub.endDate ? formatDate(sub.endDate) : "Present"}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            sub.endDate
                              ? "text-muted-foreground bg-muted"
                              : "text-success bg-success/10"
                          }`}
                        >
                          {sub.endDate ? "Ended" : "Active"}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "usage" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Expenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockUser.totalExpenses)}
                  </div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Total Income
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {formatCurrency(mockUser.totalIncome)}
                  </div>
                  <p className="text-xs text-muted-foreground">All time</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    AI Usage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{mockUser.aiUsage}</div>
                  <p className="text-xs text-muted-foreground">
                    API calls this month
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    Expense Count
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {mockUser.recentExpenses.length}
                  </div>
                  <p className="text-xs text-muted-foreground">This month</p>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Expenses</CardTitle>
                  <CardDescription>Latest expense transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.recentExpenses.map((expense) => (
                      <div
                        key={expense.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{expense.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {expense.category} • {formatDate(expense.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-error">
                            -{formatCurrency(expense.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Income</CardTitle>
                  <CardDescription>Latest income transactions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockUser.recentIncome.map((income) => (
                      <div
                        key={income.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{income.description}</p>
                          <p className="text-sm text-muted-foreground">
                            {income.source} • {formatDate(income.date)}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-success">
                            +{formatCurrency(income.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "actions" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Account Actions</CardTitle>
                  <CardDescription>
                    Manage user account and permissions
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Button variant="outline" className="justify-start">
                      <Mail className="h-4 w-4 mr-2" />
                      Send Email
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Shield className="h-4 w-4 mr-2" />
                      Reset Password
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <CreditCard className="h-4 w-4 mr-2" />
                      Change Subscription
                    </Button>
                    <Button variant="outline" className="justify-start">
                      <Download className="h-4 w-4 mr-2" />
                      Export User Data
                    </Button>
                    <Button variant="destructive" className="justify-start">
                      <UserX className="h-4 w-4 mr-2" />
                      Suspend Account
                    </Button>
                    <Button variant="destructive" className="justify-start">
                      <UserX className="h-4 w-4 mr-2" />
                      Delete Account
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
