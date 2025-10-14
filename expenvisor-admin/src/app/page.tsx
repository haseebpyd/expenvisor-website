import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StatCard } from "@/components/StatCard";
import { Sidebar } from "@/components/Sidebar";
import { Users, DollarSign, TrendingUp, Brain, Settings } from "lucide-react";

export default function DashboardPage() {
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
                  Dashboard
                </h1>
                <p className="text-muted-foreground">
                  Overview of your platform metrics
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Welcome back</p>
                  <p className="font-medium">Admin User</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Users"
              value="2,847"
              description="+12% from last month"
              icon={Users}
              trend={{ value: 12, label: "vs last month" }}
            />
            <StatCard
              title="Monthly Revenue"
              value="$24,567"
              description="+8.2% from last month"
              icon={DollarSign}
              trend={{ value: 8.2, label: "vs last month" }}
            />
            <StatCard
              title="Active Subscriptions"
              value="1,234"
              description="89% conversion rate"
              icon={TrendingUp}
              trend={{ value: 5.1, label: "vs last month" }}
            />
            <StatCard
              title="AI Usage Today"
              value="3,456"
              description="API calls processed"
              icon={Brain}
              trend={{ value: -2.3, label: "vs yesterday" }}
            />
          </div>

          {/* Charts and Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Overview</CardTitle>
                <CardDescription>
                  Monthly recurring revenue trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  Revenue Chart Placeholder
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>User Growth</CardTitle>
                <CardDescription>
                  New user registrations over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 flex items-center justify-center text-muted-foreground">
                  User Growth Chart Placeholder
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  User Management
                </CardTitle>
                <CardDescription>
                  View and manage all users, subscriptions, and accounts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Manage user accounts, view subscription details, and handle
                  support requests.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Brain className="h-5 w-5 mr-2" />
                  AI Management
                </CardTitle>
                <CardDescription>
                  Monitor AI usage, costs, and API key management
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Track OpenAI usage, manage API keys, and optimize AI costs.
                </p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Settings className="h-5 w-5 mr-2" />
                  Configuration
                </CardTitle>
                <CardDescription>
                  App settings, pricing, and feature flags
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Configure app settings, update pricing, and manage feature
                  flags.
                </p>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
