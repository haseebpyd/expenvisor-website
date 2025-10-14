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
  Key,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Plus,
  Settings,
  Activity,
  BarChart3,
  Users,
} from "lucide-react";
import { formatCurrency, formatNumber } from "@/lib/utils";

// Mock data for demonstration
const mockApiKeys = [
  {
    id: "1",
    name: "Primary Key",
    key: "sk-...abc123",
    status: "active",
    usage: 1250,
    cost: 45.67,
    lastUsed: "2024-10-14T10:30:00Z",
    createdAt: "2024-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "Backup Key",
    key: "sk-...def456",
    status: "inactive",
    usage: 0,
    cost: 0,
    lastUsed: null,
    createdAt: "2024-02-01T00:00:00Z",
  },
];

const mockUsageStats = {
  today: {
    requests: 1250,
    tokens: 45600,
    cost: 12.34,
  },
  thisMonth: {
    requests: 45600,
    tokens: 1200000,
    cost: 456.78,
  },
  lastMonth: {
    requests: 42000,
    tokens: 1100000,
    cost: 420.5,
  },
};

const mockCostBreakdown = [
  { feature: "AI Chat", percentage: 45, cost: 205.55, requests: 20500 },
  { feature: "AI Advisor", percentage: 30, cost: 137.03, requests: 13700 },
  { feature: "Voice Processing", percentage: 15, cost: 68.52, requests: 6850 },
  { feature: "OCR Processing", percentage: 10, cost: 45.68, requests: 4550 },
];

const mockTopUsers = [
  { name: "John Doe", email: "john@example.com", usage: 1250, cost: 45.67 },
  { name: "Jane Smith", email: "jane@example.com", usage: 980, cost: 35.89 },
  { name: "Mike Johnson", email: "mike@example.com", usage: 750, cost: 27.45 },
  { name: "Sarah Wilson", email: "sarah@example.com", usage: 650, cost: 23.78 },
  { name: "David Brown", email: "david@example.com", usage: 420, cost: 15.34 },
];

export default function AIManagementPage() {
  const [newKeyName, setNewKeyName] = useState("");
  const [newKeyValue, setNewKeyValue] = useState("");
  const [showAddKey, setShowAddKey] = useState(false);

  const handleAddKey = () => {
    // TODO: Implement add key logic
    console.log("Adding new key:", { name: newKeyName, key: newKeyValue });
    setNewKeyName("");
    setNewKeyValue("");
    setShowAddKey(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success bg-success/10";
      case "inactive":
        return "text-muted-foreground bg-muted";
      case "error":
        return "text-error bg-error/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const costChange =
    ((mockUsageStats.thisMonth.cost - mockUsageStats.lastMonth.cost) /
      mockUsageStats.lastMonth.cost) *
    100;

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
                  AI Management
                </h1>
                <p className="text-muted-foreground">
                  Monitor OpenAI usage, costs, and API key management
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Button size="sm" onClick={() => setShowAddKey(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add API Key
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Cost Alert */}
          {mockUsageStats.thisMonth.cost > 400 && (
            <Card className="mb-6 border-warning bg-warning/5">
              <CardContent className="pt-6">
                <div className="flex items-center">
                  <AlertTriangle className="h-5 w-5 text-warning mr-3" />
                  <div>
                    <h3 className="font-semibold text-warning">
                      High AI Usage Alert
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Current monthly cost is{" "}
                      {formatCurrency(mockUsageStats.thisMonth.cost)}. Consider
                      setting a spending cap or optimizing usage.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Usage Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Today&apos;s Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(mockUsageStats.today.cost)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(mockUsageStats.today.requests)} requests
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Monthly Cost
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(mockUsageStats.thisMonth.cost)}
                </div>
                <p
                  className={`text-xs ${
                    costChange > 0 ? "text-error" : "text-success"
                  }`}
                >
                  {costChange > 0 ? "+" : ""}
                  {costChange.toFixed(1)}% vs last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Total Requests
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(mockUsageStats.thisMonth.requests)}
                </div>
                <p className="text-xs text-muted-foreground">
                  {formatNumber(mockUsageStats.thisMonth.tokens)} tokens
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Active Keys
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockApiKeys.filter((key) => key.status === "active").length}
                </div>
                <p className="text-xs text-muted-foreground">
                  {mockApiKeys.length} total keys
                </p>
              </CardContent>
            </Card>
          </div>

          {/* API Keys Management */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Key className="h-5 w-5 mr-2" />
                API Keys Management
              </CardTitle>
              <CardDescription>
                Manage your OpenAI API keys and monitor their usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockApiKeys.map((key) => (
                  <div
                    key={key.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div>
                          <h3 className="font-medium">{key.name}</h3>
                          <p className="text-sm text-muted-foreground font-mono">
                            {key.key}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                            key.status
                          )}`}
                        >
                          {key.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-6 mt-2 text-sm text-muted-foreground">
                        <span>Usage: {formatNumber(key.usage)} requests</span>
                        <span>Cost: {formatCurrency(key.cost)}</span>
                        <span>
                          Created:{" "}
                          {new Date(key.createdAt).toLocaleDateString()}
                        </span>
                        {key.lastUsed && (
                          <span>
                            Last used:{" "}
                            {new Date(key.lastUsed).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        Test
                      </Button>
                      <Button variant="outline" size="sm">
                        Rotate
                      </Button>
                      <Button variant="destructive" size="sm">
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cost Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BarChart3 className="h-5 w-5 mr-2" />
                  Cost by Feature
                </CardTitle>
                <CardDescription>
                  Breakdown of AI costs by feature usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockCostBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium">
                          {item.feature}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(item.cost)} ({item.percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        {formatNumber(item.requests)} requests
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Top Users by AI Usage
                </CardTitle>
                <CardDescription>
                  Users with highest AI feature usage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockTopUsers.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatNumber(user.usage)} requests
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatCurrency(user.cost)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Add API Key Modal */}
          {showAddKey && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <Card className="w-full max-w-md">
                <CardHeader>
                  <CardTitle>Add New API Key</CardTitle>
                  <CardDescription>
                    Add a new OpenAI API key to your account
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Key Name</label>
                    <Input
                      placeholder="e.g., Production Key"
                      value={newKeyName}
                      onChange={(e) => setNewKeyName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">API Key</label>
                    <Input
                      placeholder="sk-..."
                      value={newKeyValue}
                      onChange={(e) => setNewKeyValue(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setShowAddKey(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleAddKey}>Add Key</Button>
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
