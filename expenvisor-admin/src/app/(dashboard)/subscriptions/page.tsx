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
import { Sidebar } from "@/components/Sidebar";
import {
  CreditCard,
  TrendingUp,
  Users,
  DollarSign,
  Download,
  Filter,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { formatCurrency, formatNumber, formatDate } from "@/lib/utils";

// Mock data for demonstration
const mockRevenueStats = {
  mrr: 24567.89,
  arr: 294814.68,
  totalSubscriptions: 1234,
  churnRate: 2.3,
  arpu: 19.92,
  conversionRate: 12.5,
};

const mockSubscriptionBreakdown = [
  { plan: "Free", count: 1613, percentage: 56.7, revenue: 0 },
  { plan: "Standard", count: 802, percentage: 28.2, revenue: 4009.98 },
  { plan: "Premium", count: 432, percentage: 15.1, revenue: 4319.88 },
];

const mockRecentSubscriptions = [
  {
    id: "1",
    user: "John Doe",
    email: "john@example.com",
    plan: "Premium",
    amount: 9.99,
    status: "active",
    date: "2024-10-14T10:30:00Z",
    nextBilling: "2024-11-14T10:30:00Z",
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane@example.com",
    plan: "Standard",
    amount: 4.99,
    status: "active",
    date: "2024-10-13T15:45:00Z",
    nextBilling: "2024-11-13T15:45:00Z",
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike@example.com",
    plan: "Free",
    amount: 0,
    status: "active",
    date: "2024-10-12T09:20:00Z",
    nextBilling: null,
  },
  {
    id: "4",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    plan: "Premium",
    amount: 9.99,
    status: "cancelled",
    date: "2024-10-11T14:15:00Z",
    nextBilling: null,
  },
  {
    id: "5",
    user: "David Brown",
    email: "david@example.com",
    plan: "Standard",
    amount: 4.99,
    status: "failed",
    date: "2024-10-10T11:30:00Z",
    nextBilling: "2024-11-10T11:30:00Z",
  },
];

const mockFailedPayments = [
  {
    id: "1",
    user: "David Brown",
    email: "david@example.com",
    amount: 4.99,
    reason: "Insufficient funds",
    date: "2024-10-14T10:30:00Z",
    retryCount: 2,
  },
  {
    id: "2",
    user: "Lisa Garcia",
    email: "lisa@example.com",
    amount: 9.99,
    reason: "Card expired",
    date: "2024-10-13T15:45:00Z",
    retryCount: 1,
  },
];

export default function SubscriptionsPage() {
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPlan, setFilterPlan] = useState("all");

  const filteredSubscriptions = mockRecentSubscriptions.filter((sub) => {
    const matchesStatus = filterStatus === "all" || sub.status === filterStatus;
    const matchesPlan = filterPlan === "all" || sub.plan === filterPlan;
    return matchesStatus && matchesPlan;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "text-success bg-success/10";
      case "cancelled":
        return "text-muted-foreground bg-muted";
      case "failed":
        return "text-error bg-error/10";
      case "pending":
        return "text-warning bg-warning/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <CheckCircle className="h-4 w-4 text-success" />;
      case "cancelled":
        return <XCircle className="h-4 w-4 text-muted-foreground" />;
      case "failed":
        return <AlertCircle className="h-4 w-4 text-error" />;
      case "pending":
        return <RefreshCw className="h-4 w-4 text-warning" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
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
                  Subscriptions & Revenue
                </h1>
                <p className="text-muted-foreground">
                  Monitor subscription metrics and revenue analytics
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Revenue Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <DollarSign className="h-4 w-4 mr-2" />
                  Monthly Recurring Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(mockRevenueStats.mrr)}
                </div>
                <p className="text-sm text-success">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Annual Recurring Revenue
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(mockRevenueStats.arr)}
                </div>
                <p className="text-sm text-success">+12.5% from last year</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Total Subscriptions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatNumber(mockRevenueStats.totalSubscriptions)}
                </div>
                <p className="text-sm text-success">+156 this month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Churn Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockRevenueStats.churnRate}%
                </div>
                <p className="text-sm text-success">-0.3% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <CreditCard className="h-4 w-4 mr-2" />
                  ARPU
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatCurrency(mockRevenueStats.arpu)}
                </div>
                <p className="text-sm text-success">+2.1% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Conversion Rate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockRevenueStats.conversionRate}%
                </div>
                <p className="text-sm text-success">+1.2% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Subscription Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Subscription Breakdown</CardTitle>
                <CardDescription>
                  Distribution of users across subscription plans
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockSubscriptionBreakdown.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{item.plan}</span>
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
                              item.plan
                            )}`}
                          >
                            {item.count} users
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="font-medium">
                            {item.percentage}%
                          </span>
                          {item.revenue > 0 && (
                            <p className="text-sm text-muted-foreground">
                              {formatCurrency(item.revenue)}/month
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Failed Payments</CardTitle>
                <CardDescription>
                  Recent payment failures requiring attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockFailedPayments.map((payment) => (
                    <div
                      key={payment.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div>
                        <p className="font-medium">{payment.user}</p>
                        <p className="text-sm text-muted-foreground">
                          {payment.email}
                        </p>
                        <p className="text-xs text-error">{payment.reason}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(payment.amount)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {formatDate(payment.date)}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {payment.retryCount} retries
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Subscriptions */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Recent Subscriptions</CardTitle>
                  <CardDescription>
                    Latest subscription changes and updates
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="cancelled">Cancelled</option>
                    <option value="failed">Failed</option>
                    <option value="pending">Pending</option>
                  </select>
                  <select
                    value={filterPlan}
                    onChange={(e) => setFilterPlan(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Plans</option>
                    <option value="Free">Free</option>
                    <option value="Standard">Standard</option>
                    <option value="Premium">Premium</option>
                  </select>
                </div>
              </div>
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
                        Plan
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Amount
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Date
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Next Billing
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredSubscriptions.map((subscription) => (
                      <tr
                        key={subscription.id}
                        className="border-b hover:bg-muted/50"
                      >
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium">
                              {subscription.user}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {subscription.email}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(
                              subscription.plan
                            )}`}
                          >
                            {subscription.plan}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="font-medium">
                            {subscription.amount > 0
                              ? formatCurrency(subscription.amount)
                              : "Free"}
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            {getStatusIcon(subscription.status)}
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                subscription.status
                              )}`}
                            >
                              {subscription.status}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {formatDate(subscription.date)}
                        </td>
                        <td className="py-4 px-4 text-sm text-muted-foreground">
                          {subscription.nextBilling
                            ? formatDate(subscription.nextBilling)
                            : "N/A"}
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                            {subscription.status === "failed" && (
                              <Button variant="outline" size="sm">
                                Retry
                              </Button>
                            )}
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
