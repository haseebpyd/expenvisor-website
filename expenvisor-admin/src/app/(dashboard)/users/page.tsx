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
  Search,
  Filter,
  Download,
  MoreHorizontal,
  Eye,
  Mail,
  Brain,
} from "lucide-react";
import { formatDate, formatCurrency, getInitials } from "@/lib/utils";

// Mock data for demonstration
const mockUsers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    subscription: "Premium",
    joinDate: "2024-01-15",
    lastActive: "2024-10-14",
    totalExpenses: 1250,
    aiUsage: 45,
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane@example.com",
    subscription: "Standard",
    joinDate: "2024-02-20",
    lastActive: "2024-10-13",
    totalExpenses: 890,
    aiUsage: 23,
    status: "active",
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike@example.com",
    subscription: "Free",
    joinDate: "2024-03-10",
    lastActive: "2024-10-10",
    totalExpenses: 340,
    aiUsage: 8,
    status: "inactive",
  },
  {
    id: "4",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    subscription: "Premium",
    joinDate: "2024-01-05",
    lastActive: "2024-10-14",
    totalExpenses: 2100,
    aiUsage: 67,
    status: "active",
  },
  {
    id: "5",
    name: "David Brown",
    email: "david@example.com",
    subscription: "Standard",
    joinDate: "2024-04-12",
    lastActive: "2024-10-12",
    totalExpenses: 650,
    aiUsage: 15,
    status: "suspended",
  },
];

export default function UsersPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterSubscription, setFilterSubscription] = useState("all");

  const filteredUsers = mockUsers.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || user.status === filterStatus;
    const matchesSubscription =
      filterSubscription === "all" || user.subscription === filterSubscription;

    return matchesSearch && matchesStatus && matchesSubscription;
  });

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
              <div>
                <h1 className="text-2xl font-bold text-foreground">
                  User Management
                </h1>
                <p className="text-muted-foreground">
                  Manage all users and their accounts
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{mockUsers.length}</div>
                <p className="text-xs text-muted-foreground">
                  +12% from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockUsers.filter((u) => u.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">89% of total</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Premium Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockUsers.filter((u) => u.subscription === "Premium").length}
                </div>
                <p className="text-xs text-muted-foreground">35% conversion</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  AI Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockUsers.reduce((sum, u) => sum + u.aiUsage, 0)}
                </div>
                <p className="text-xs text-muted-foreground">Total API calls</p>
              </CardContent>
            </Card>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search users by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>

                  <select
                    value={filterSubscription}
                    onChange={(e) => setFilterSubscription(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Plans</option>
                    <option value="Free">Free</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card>
            <CardHeader>
              <CardTitle>Users ({filteredUsers.length})</CardTitle>
              <CardDescription>
                Manage user accounts and subscriptions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        User
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Subscription
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Join Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Last Active
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Expenses
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        AI Usage
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="border-b hover:bg-muted/50">
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-sm font-medium text-primary">
                                {getInitials(user.name)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium">{user.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getSubscriptionColor(
                              user.subscription
                            )}`}
                          >
                            {user.subscription}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                              user.status
                            )}`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {formatDate(user.joinDate)}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {formatDate(user.lastActive)}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          {formatCurrency(user.totalExpenses)}
                        </td>
                        <td className="py-4 px-4 text-sm">
                          <div className="flex items-center">
                            <Brain className="h-4 w-4 text-muted-foreground mr-1" />
                            {user.aiUsage}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
}
