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
  BarChart3,
  TrendingUp,
  Users,
  Activity,
  Download,
  RefreshCw,
} from "lucide-react";
import { formatNumber, formatCurrency } from "@/lib/utils";

// Mock data for demonstration
const mockUserMetrics = {
  dau: 1247,
  mau: 2847,
  wau: 2103,
  newSignups: 156,
  retention: {
    d1: 78.5,
    d7: 45.2,
    d30: 23.8,
  },
};

const mockEngagementMetrics = {
  avgExpensesPerUser: 12.5,
  avgSessionDuration: 8.5, // minutes
  featureAdoption: {
    voiceInput: 23.4,
    ocr: 18.7,
    aiChat: 45.2,
    aiAdvisor: 12.8,
  },
  topCategories: [
    { name: "Food & Dining", percentage: 28.5, count: 1250 },
    { name: "Transportation", percentage: 22.1, count: 970 },
    { name: "Shopping", percentage: 18.3, count: 803 },
    { name: "Entertainment", percentage: 15.7, count: 689 },
    { name: "Bills & Utilities", percentage: 15.4, count: 676 },
  ],
};

const mockConversionFunnel = [
  { stage: "App Installs", count: 10000, percentage: 100 },
  { stage: "Account Created", count: 7500, percentage: 75 },
  { stage: "First Expense", count: 6200, percentage: 62 },
  { stage: "Voice/OCR Used", count: 3100, percentage: 31 },
  { stage: "Subscription", count: 1247, percentage: 12.5 },
];

const mockGeographicData = [
  { country: "United States", users: 1250, revenue: 12450 },
  { country: "Canada", users: 450, revenue: 3200 },
  { country: "United Kingdom", users: 380, revenue: 2800 },
  { country: "Australia", users: 290, revenue: 2100 },
  { country: "Germany", users: 220, revenue: 1650 },
];

const mockDeviceData = {
  ios: { percentage: 58.3, users: 1658 },
  android: { percentage: 41.7, users: 1189 },
};

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d");
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // TODO: Implement refresh logic
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
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
                  Analytics
                </h1>
                <p className="text-muted-foreground">
                  User metrics, engagement, and growth analytics
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <select
                  value={timeRange}
                  onChange={(e) => setTimeRange(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                </select>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleRefresh}
                  disabled={isLoading}
                >
                  <RefreshCw
                    className={`h-4 w-4 mr-2 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  Refresh
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* User Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  Daily Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatNumber(mockUserMetrics.dau)}
                </div>
                <p className="text-sm text-success">+12.5% from yesterday</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <Activity className="h-4 w-4 mr-2" />
                  Monthly Active Users
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatNumber(mockUserMetrics.mau)}
                </div>
                <p className="text-sm text-success">+8.2% from last month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  New Signups
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {formatNumber(mockUserMetrics.newSignups)}
                </div>
                <p className="text-sm text-success">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  D30 Retention
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  {mockUserMetrics.retention.d30}%
                </div>
                <p className="text-sm text-success">+2.1% from last month</p>
              </CardContent>
            </Card>
          </div>

          {/* Engagement Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <Card>
              <CardHeader>
                <CardTitle>Feature Adoption</CardTitle>
                <CardDescription>
                  Percentage of users using each feature
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(mockEngagementMetrics.featureAdoption).map(
                    ([feature, percentage]) => (
                      <div key={feature}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium capitalize">
                            {feature.replace(/([A-Z])/g, " $1").trim()}
                          </span>
                          <span className="text-sm font-medium">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full"
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Expense Categories</CardTitle>
                <CardDescription>Most used expense categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockEngagementMetrics.topCategories.map(
                    (category, index) => (
                      <div key={index}>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">
                            {category.name}
                          </span>
                          <div className="text-right">
                            <span className="text-sm font-medium">
                              {category.percentage}%
                            </span>
                            <p className="text-xs text-muted-foreground">
                              {formatNumber(category.count)} expenses
                            </p>
                          </div>
                        </div>
                        <div className="w-full bg-muted rounded-full h-2">
                          <div
                            className="bg-secondary h-2 rounded-full"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                      </div>
                    )
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Conversion Funnel */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Conversion Funnel</CardTitle>
              <CardDescription>
                User journey from app install to subscription
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockConversionFunnel.map((stage, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-32 text-sm font-medium text-muted-foreground">
                      {stage.stage}
                    </div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-muted rounded-full h-8 relative">
                        <div
                          className="bg-primary h-8 rounded-full flex items-center justify-center text-white text-sm font-medium"
                          style={{ width: `${stage.percentage}%` }}
                        >
                          {stage.percentage}%
                        </div>
                      </div>
                    </div>
                    <div className="w-20 text-right text-sm font-medium">
                      {formatNumber(stage.count)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Geographic & Device Data */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Geographic Distribution</CardTitle>
                <CardDescription>Users and revenue by country</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockGeographicData.map((country, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <div>
                        <p className="font-medium">{country.country}</p>
                        <p className="text-sm text-muted-foreground">
                          {formatNumber(country.users)} users
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">
                          {formatCurrency(country.revenue)}
                        </p>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Device Distribution</CardTitle>
                <CardDescription>iOS vs Android usage</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">iOS</span>
                      <span className="text-sm font-medium">
                        {mockDeviceData.ios.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-primary h-3 rounded-full"
                        style={{ width: `${mockDeviceData.ios.percentage}%` }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatNumber(mockDeviceData.ios.users)} users
                    </p>
                  </div>

                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Android</span>
                      <span className="text-sm font-medium">
                        {mockDeviceData.android.percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-3">
                      <div
                        className="bg-secondary h-3 rounded-full"
                        style={{
                          width: `${mockDeviceData.android.percentage}%`,
                        }}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {formatNumber(mockDeviceData.android.users)} users
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
