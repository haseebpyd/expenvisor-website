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
  Settings,
  DollarSign,
  ToggleLeft,
  ToggleRight,
  Save,
  RefreshCw,
  AlertCircle,
  CheckCircle,
  Plus,
  Trash2,
  Edit,
} from "lucide-react";

// Mock data for demonstration
const mockPricing = {
  free: {
    price: 0,
    features: [
      "Up to 10 expenses per month",
      "Basic categories",
      "Simple reports",
      "Email support",
    ],
    limits: {
      expenses: 10,
      aiChat: 0,
      voiceInput: 0,
      ocrScans: 0,
    },
  },
  standard: {
    price: 4.99,
    features: [
      "Unlimited expenses",
      "Advanced categories",
      "Detailed reports",
      "AI Chat (50 messages/month)",
      "Priority support",
    ],
    limits: {
      expenses: -1, // unlimited
      aiChat: 50,
      voiceInput: 20,
      ocrScans: 10,
    },
  },
  premium: {
    price: 9.99,
    features: [
      "Everything in Standard",
      "AI Advisor",
      "Voice Input (unlimited)",
      "OCR Scans (unlimited)",
      "Advanced analytics",
      "24/7 support",
    ],
    limits: {
      expenses: -1, // unlimited
      aiChat: -1, // unlimited
      voiceInput: -1, // unlimited
      ocrScans: -1, // unlimited
    },
  },
};

const mockFeatureFlags = [
  {
    id: "voice_input",
    name: "Voice Input",
    description: "Allow users to add expenses via voice",
    enabled: true,
  },
  {
    id: "ocr_scanning",
    name: "OCR Scanning",
    description: "Allow users to scan receipts with camera",
    enabled: true,
  },
  {
    id: "ai_chat",
    name: "AI Chat",
    description: "Enable AI-powered chat assistance",
    enabled: true,
  },
  {
    id: "ai_advisor",
    name: "AI Advisor",
    description: "Provide AI financial advice",
    enabled: true,
  },
  {
    id: "export_data",
    name: "Data Export",
    description: "Allow users to export their data",
    enabled: true,
  },
  {
    id: "maintenance_mode",
    name: "Maintenance Mode",
    description: "Put app in maintenance mode",
    enabled: false,
  },
  {
    id: "beta_features",
    name: "Beta Features",
    description: "Enable experimental features",
    enabled: false,
  },
];

const mockExpenseCategories = [
  {
    id: "1",
    name: "Food & Dining",
    icon: "🍽️",
    color: "#FF6B6B",
    active: true,
  },
  {
    id: "2",
    name: "Transportation",
    icon: "🚗",
    color: "#4ECDC4",
    active: true,
  },
  { id: "3", name: "Shopping", icon: "🛍️", color: "#45B7D1", active: true },
  {
    id: "4",
    name: "Entertainment",
    icon: "🎬",
    color: "#96CEB4",
    active: true,
  },
  {
    id: "5",
    name: "Bills & Utilities",
    icon: "💡",
    color: "#FFEAA7",
    active: true,
  },
  { id: "6", name: "Healthcare", icon: "🏥", color: "#DDA0DD", active: true },
  { id: "7", name: "Education", icon: "📚", color: "#98D8C8", active: false },
  { id: "8", name: "Travel", icon: "✈️", color: "#F7DC6F", active: true },
];

const mockNotificationTemplates = [
  {
    id: "1",
    name: "Budget Warning 80%",
    type: "budget_warning",
    subject: "You've spent 80% of your monthly budget",
    body: "Hi {name}, you've spent 80% of your ${budget} monthly budget. Current spending: ${spent}",
    enabled: true,
  },
  {
    id: "2",
    name: "Budget Warning 90%",
    type: "budget_warning",
    subject: "You've spent 90% of your monthly budget",
    body: "Hi {name}, you've spent 90% of your ${budget} monthly budget. Current spending: ${spent}",
    enabled: true,
  },
  {
    id: "3",
    name: "Budget Exceeded",
    type: "budget_exceeded",
    subject: "You've exceeded your monthly budget",
    body: "Hi {name}, you've exceeded your ${budget} monthly budget. Current spending: ${spent}",
    enabled: true,
  },
  {
    id: "4",
    name: "Welcome Email",
    type: "welcome",
    subject: "Welcome to Expenvisor!",
    body: "Hi {name}, welcome to Expenvisor! Start tracking your expenses and take control of your finances.",
    enabled: true,
  },
];

export default function ConfigurationPage() {
  const [activeTab, setActiveTab] = useState("pricing");
  const [pricing, setPricing] = useState(mockPricing);
  const [featureFlags, setFeatureFlags] = useState(mockFeatureFlags);
  const [categories, setCategories] = useState(mockExpenseCategories);
  const [notifications, setNotifications] = useState(mockNotificationTemplates);
  const [isSaving, setIsSaving] = useState(false);

  const tabs = [
    { id: "pricing", label: "Pricing", icon: DollarSign },
    { id: "features", label: "Feature Flags", icon: ToggleLeft },
    { id: "categories", label: "Categories", icon: Edit },
    { id: "notifications", label: "Notifications", icon: AlertCircle },
    { id: "app", label: "App Settings", icon: Settings },
  ];

  const handleSave = async () => {
    setIsSaving(true);
    // TODO: Implement save logic
    setTimeout(() => {
      setIsSaving(false);
    }, 1000);
  };

  const toggleFeatureFlag = (id: string) => {
    setFeatureFlags((flags) =>
      flags.map((flag) =>
        flag.id === id ? { ...flag, enabled: !flag.enabled } : flag
      )
    );
  };

  const toggleCategory = (id: string) => {
    setCategories((cats) =>
      cats.map((cat) => (cat.id === id ? { ...cat, active: !cat.active } : cat))
    );
  };

  const getStatusColor = (enabled: boolean) => {
    return enabled
      ? "text-success bg-success/10"
      : "text-muted-foreground bg-muted";
  };

  const getStatusIcon = (enabled: boolean) => {
    return enabled ? (
      <CheckCircle className="h-4 w-4 text-success" />
    ) : (
      <AlertCircle className="h-4 w-4 text-muted-foreground" />
    );
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
                  Configuration
                </h1>
                <p className="text-muted-foreground">
                  Manage app settings, pricing, and feature flags
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  <Save className="h-4 w-4 mr-2" />
                  {isSaving ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
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

          {/* Pricing Tab */}
          {activeTab === "pricing" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(pricing).map(([plan, data]) => (
                  <Card
                    key={plan}
                    className={plan === "premium" ? "ring-2 ring-primary" : ""}
                  >
                    <CardHeader>
                      <CardTitle className="capitalize flex items-center justify-between">
                        {plan} Plan
                        {plan === "premium" && (
                          <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded">
                            Popular
                          </span>
                        )}
                      </CardTitle>
                      <div className="text-3xl font-bold">
                        ${data.price}
                        <span className="text-sm font-normal text-muted-foreground">
                          /month
                        </span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">
                            Monthly Price
                          </label>
                          <Input
                            type="number"
                            step="0.01"
                            value={data.price}
                            onChange={(e) =>
                              setPricing((prev) => ({
                                ...prev,
                                [plan]: {
                                  ...data,
                                  price: parseFloat(e.target.value) || 0,
                                },
                              }))
                            }
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium">
                            Features
                          </label>
                          <div className="space-y-2">
                            {data.features.map((feature, index) => (
                              <div
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <CheckCircle className="h-4 w-4 text-success mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Feature Flags Tab */}
          {activeTab === "features" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Feature Flags</CardTitle>
                  <CardDescription>
                    Enable or disable app features globally
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {featureFlags.map((flag) => (
                      <div
                        key={flag.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{flag.name}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                flag.enabled
                              )}`}
                            >
                              {flag.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            {flag.description}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusIcon(flag.enabled)}
                          <button
                            onClick={() => toggleFeatureFlag(flag.id)}
                            className={`p-1 rounded-md transition-colors ${
                              flag.enabled
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {flag.enabled ? (
                              <ToggleRight className="h-5 w-5" />
                            ) : (
                              <ToggleLeft className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Categories Tab */}
          {activeTab === "categories" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Expense Categories</CardTitle>
                      <CardDescription>
                        Manage expense categories and their settings
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Category
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {categories.map((category) => (
                      <div
                        key={category.id}
                        className="flex items-center justify-between p-4 border rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <h3 className="font-medium">{category.name}</h3>
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-4 h-4 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  category.active
                                )}`}
                              >
                                {category.active ? "Active" : "Inactive"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                          <button
                            onClick={() => toggleCategory(category.id)}
                            className={`p-1 rounded-md transition-colors ${
                              category.active
                                ? "bg-success/10 text-success"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {category.active ? (
                              <ToggleRight className="h-5 w-5" />
                            ) : (
                              <ToggleLeft className="h-5 w-5" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Notification Templates</CardTitle>
                      <CardDescription>
                        Manage email notification templates
                      </CardDescription>
                    </div>
                    <Button size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Template
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {notifications.map((template) => (
                      <div key={template.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <h3 className="font-medium">{template.name}</h3>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                template.enabled
                              )}`}
                            >
                              {template.enabled ? "Enabled" : "Disabled"}
                            </span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                            <button
                              onClick={() =>
                                setNotifications((prev) =>
                                  prev.map((t) =>
                                    t.id === template.id
                                      ? { ...t, enabled: !t.enabled }
                                      : t
                                  )
                                )
                              }
                              className={`p-1 rounded-md transition-colors ${
                                template.enabled
                                  ? "bg-success/10 text-success"
                                  : "bg-muted text-muted-foreground"
                              }`}
                            >
                              {template.enabled ? (
                                <ToggleRight className="h-5 w-5" />
                              ) : (
                                <ToggleLeft className="h-5 w-5" />
                              )}
                            </button>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Subject
                            </label>
                            <p className="text-sm">{template.subject}</p>
                          </div>
                          <div>
                            <label className="text-sm font-medium text-muted-foreground">
                              Body
                            </label>
                            <p className="text-sm text-muted-foreground">
                              {template.body}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* App Settings Tab */}
          {activeTab === "app" && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>App Information</CardTitle>
                    <CardDescription>
                      Basic app settings and metadata
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">App Name</label>
                      <Input defaultValue="Expenvisor" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">App Version</label>
                      <Input defaultValue="1.0.0" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Minimum Supported Version
                      </label>
                      <Input defaultValue="1.0.0" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Support Email
                      </label>
                      <Input defaultValue="support@expenvisor.com" />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Store Links</CardTitle>
                    <CardDescription>
                      App store and download links
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">
                        App Store URL
                      </label>
                      <Input defaultValue="https://apps.apple.com/app/expenvisor" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">
                        Google Play URL
                      </label>
                      <Input defaultValue="https://play.google.com/store/apps/details?id=com.expenvisor" />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Website URL</label>
                      <Input defaultValue="https://expenvisor.com" />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
