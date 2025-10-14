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
  HelpCircle,
  MessageSquare,
  AlertTriangle,
  CheckCircle,
  Clock,
  User,
  Mail,
  Calendar,
  Search,
  Send,
  Bell,
} from "lucide-react";
import { formatDate, formatDateTime, formatNumber } from "@/lib/utils";

// Mock data for demonstration
const mockTickets = [
  {
    id: "1",
    user: "John Doe",
    email: "john@example.com",
    subject: "Unable to add expense via voice",
    status: "open",
    priority: "high",
    category: "Bug Report",
    createdAt: "2024-10-14T10:30:00Z",
    lastActivity: "2024-10-14T14:20:00Z",
    assignedTo: "Support Team",
    messages: 3,
  },
  {
    id: "2",
    user: "Jane Smith",
    email: "jane@example.com",
    subject: "Subscription billing issue",
    status: "in_progress",
    priority: "medium",
    category: "Billing",
    createdAt: "2024-10-13T15:45:00Z",
    lastActivity: "2024-10-14T09:15:00Z",
    assignedTo: "Finance Team",
    messages: 5,
  },
  {
    id: "3",
    user: "Mike Johnson",
    email: "mike@example.com",
    subject: "Feature request: Dark mode",
    status: "closed",
    priority: "low",
    category: "Feature Request",
    createdAt: "2024-10-12T09:20:00Z",
    lastActivity: "2024-10-13T16:30:00Z",
    assignedTo: "Product Team",
    messages: 2,
  },
  {
    id: "4",
    user: "Sarah Wilson",
    email: "sarah@example.com",
    subject: "App crashes on startup",
    status: "open",
    priority: "high",
    category: "Bug Report",
    createdAt: "2024-10-11T14:15:00Z",
    lastActivity: "2024-10-11T14:15:00Z",
    assignedTo: "Unassigned",
    messages: 1,
  },
  {
    id: "5",
    user: "David Brown",
    email: "david@example.com",
    subject: "Account deletion request",
    status: "in_progress",
    priority: "medium",
    category: "Account",
    createdAt: "2024-10-10T11:30:00Z",
    lastActivity: "2024-10-14T08:45:00Z",
    assignedTo: "Support Team",
    messages: 4,
  },
];

const mockStats = {
  totalTickets: 1247,
  openTickets: 23,
  inProgressTickets: 45,
  closedTickets: 1179,
  avgResponseTime: 2.5, // hours
  satisfactionScore: 4.6,
};

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);

  const filteredTickets = mockTickets.filter((ticket) => {
    const matchesSearch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || ticket.status === filterStatus;
    const matchesPriority =
      filterPriority === "all" || ticket.priority === filterPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "open":
        return "text-error bg-error/10";
      case "in_progress":
        return "text-warning bg-warning/10";
      case "closed":
        return "text-success bg-success/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-error bg-error/10";
      case "medium":
        return "text-warning bg-warning/10";
      case "low":
        return "text-info bg-info/10";
      default:
        return "text-muted-foreground bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "open":
        return <AlertTriangle className="h-4 w-4 text-error" />;
      case "in_progress":
        return <Clock className="h-4 w-4 text-warning" />;
      case "closed":
        return <CheckCircle className="h-4 w-4 text-success" />;
      default:
        return <HelpCircle className="h-4 w-4 text-muted-foreground" />;
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
                  Support Center
                </h1>
                <p className="text-muted-foreground">
                  Manage support tickets and customer inquiries
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Bell className="h-4 w-4 mr-2" />
                  Send Notification
                </Button>
                <Button size="sm">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  New Ticket
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-8">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatNumber(mockStats.totalTickets)}
                </div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Open Tickets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-error">
                  {mockStats.openTickets}
                </div>
                <p className="text-xs text-muted-foreground">
                  Require attention
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-warning">
                  {mockStats.inProgressTickets}
                </div>
                <p className="text-xs text-muted-foreground">Being handled</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Avg Response Time
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {mockStats.avgResponseTime}h
                </div>
                <p className="text-xs text-success">-0.5h from last week</p>
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
                      placeholder="Search tickets by subject, user, or email..."
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
                    <option value="open">Open</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed</option>
                  </select>

                  <select
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="px-3 py-2 border border-input rounded-md bg-background text-sm"
                  >
                    <option value="all">All Priority</option>
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tickets List */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    Support Tickets ({filteredTickets.length})
                  </CardTitle>
                  <CardDescription>
                    Recent customer support requests
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredTickets.map((ticket) => (
                      <div
                        key={ticket.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedTicket === ticket.id
                            ? "ring-2 ring-primary bg-primary/5"
                            : "hover:bg-muted/50"
                        }`}
                        onClick={() => setSelectedTicket(ticket.id)}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              {getStatusIcon(ticket.status)}
                              <h3 className="font-medium">{ticket.subject}</h3>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-2">
                              <span className="flex items-center">
                                <User className="h-4 w-4 mr-1" />
                                {ticket.user}
                              </span>
                              <span className="flex items-center">
                                <Mail className="h-4 w-4 mr-1" />
                                {ticket.email}
                              </span>
                              <span className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                {formatDate(ticket.createdAt)}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                                  ticket.status
                                )}`}
                              >
                                {ticket.status.replace("_", " ")}
                              </span>
                              <span
                                className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                                  ticket.priority
                                )}`}
                              >
                                {ticket.priority}
                              </span>
                              <span className="px-2 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
                                {ticket.category}
                              </span>
                            </div>
                          </div>
                          <div className="text-right text-sm text-muted-foreground">
                            <p>Assigned to</p>
                            <p className="font-medium">{ticket.assignedTo}</p>
                            <p className="text-xs">
                              {ticket.messages} messages
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Ticket Details */}
            <div>
              {selectedTicket ? (
                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Details</CardTitle>
                    <CardDescription>
                      View and respond to ticket
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Subject
                        </label>
                        <p className="text-sm">
                          {
                            filteredTickets.find((t) => t.id === selectedTicket)
                              ?.subject
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          User
                        </label>
                        <p className="text-sm">
                          {
                            filteredTickets.find((t) => t.id === selectedTicket)
                              ?.user
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Email
                        </label>
                        <p className="text-sm">
                          {
                            filteredTickets.find((t) => t.id === selectedTicket)
                              ?.email
                          }
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Created
                        </label>
                        <p className="text-sm">
                          {formatDateTime(
                            filteredTickets.find((t) => t.id === selectedTicket)
                              ?.createdAt || ""
                          )}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-muted-foreground">
                          Last Activity
                        </label>
                        <p className="text-sm">
                          {formatDateTime(
                            filteredTickets.find((t) => t.id === selectedTicket)
                              ?.lastActivity || ""
                          )}
                        </p>
                      </div>

                      <div className="pt-4 border-t">
                        <label className="text-sm font-medium text-muted-foreground">
                          Response
                        </label>
                        <textarea
                          className="w-full mt-2 p-3 border rounded-md resize-none"
                          rows={4}
                          placeholder="Type your response here..."
                        />
                        <div className="flex justify-end mt-2">
                          <Button size="sm">
                            <Send className="h-4 w-4 mr-2" />
                            Send Response
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>Select a ticket to view details</p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
