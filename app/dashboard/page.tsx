/**
 * Dashboard Page
 * Main dashboard with stats and recent accidents
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { accidentService, type Accident, AccidentSeverity } from "@/lib/api";
import {
  AlertCircle,
  Ambulance,
  TrendingUp,
  Clock,
  Car,
  ArrowRight,
  Activity,
} from "lucide-react";
import { format } from "date-fns";
import { Card, CardBody, Badge } from "@/components/ui";

export default function DashboardPage() {
  const [recentAccidents, setRecentAccidents] = useState<Accident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    console.log("📊 Dashboard mounted");
    const token = localStorage.getItem("accessToken");
    console.log("🔑 Token on mount:", token ? "Present" : "Missing");
    
    // Small delay to ensure auth tokens are properly set
    const timer = setTimeout(() => {
      loadDashboardData();
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  const loadDashboardData = async () => {
    try {
      // Verify we have a token before making the request
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.warn("⚠️ No access token found when loading dashboard data");
        setIsLoading(false);
        return;
      }
      
      console.log("📡 Fetching accidents...");
      const response = await accidentService.getAccidents({ limit: 5 });
      console.log("✅ Accidents loaded:", response.data.length);
      setRecentAccidents(response.data);
    } catch (error) {
      console.error("❌ Failed to load dashboard data", error);
      // Don't throw - let the page load with empty data
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityVariant = (
    severity: AccidentSeverity,
  ): "default" | "success" | "warning" | "danger" | "info" => {
    switch (severity) {
      case "critical":
        return "danger";
      case "severe":
        return "warning";
      case "moderate":
        return "info";
      case "minor":
        return "success";
      default:
        return "default";
    }
  };

  const stats = [
    {
      title: "Total Accidents",
      value: recentAccidents.length,
      icon: AlertCircle,
      gradient: "from-red-500 to-orange-500",
      iconBg: "bg-red-100 dark:bg-red-900/30",
      iconColor: "text-red-600 dark:text-red-400",
    },
    {
      title: "Active Dispatches",
      value: "0",
      icon: Ambulance,
      gradient: "from-blue-500 to-cyan-500",
      iconBg: "bg-blue-100 dark:bg-blue-900/30",
      iconColor: "text-blue-600 dark:text-blue-400",
    },
    {
      title: "Avg Response Time",
      value: "8 min",
      icon: Clock,
      gradient: "from-green-500 to-emerald-500",
      iconBg: "bg-green-100 dark:bg-green-900/30",
      iconColor: "text-green-600 dark:text-green-400",
    },
    {
      title: "This Month",
      value: recentAccidents.length,
      icon: TrendingUp,
      gradient: "from-purple-500 to-pink-500",
      iconBg: "bg-purple-100 dark:bg-purple-900/30",
      iconColor: "text-purple-600 dark:text-purple-400",
    },
  ];

  const quickActions = [
    {
      title: "Report Accident",
      description: "Submit a new accident report with AI analysis",
      icon: AlertCircle,
      gradient: "from-red-500 to-orange-500",
      href: "/accidents/report",
    },
    {
      title: "View Accidents",
      description: "See all reported accidents and their status",
      icon: Activity,
      gradient: "from-blue-500 to-cyan-500",
      href: "/accidents/list",
    },
    {
      title: "My Vehicles",
      description: "Manage your registered vehicles",
      icon: Car,
      gradient: "from-green-500 to-emerald-500",
      href: "/vehicles",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="group hover:scale-105 transition-transform cursor-pointer"
            >
              <CardBody className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={`p-3 rounded-xl ${stat.iconBg} group-hover:scale-110 transition-transform`}
                >
                  <stat.icon size={28} className={stat.iconColor} />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <Card
              key={index}
              onClick={() => router.push(action.href)}
              className="group cursor-pointer hover:scale-105 transition-all overflow-hidden"
            >
              <div className={`h-2 bg-gradient-to-r ${action.gradient}`}></div>
              <CardBody className="p-6">
                <action.icon
                  size={32}
                  className={`text-gray-700 dark:text-gray-300 mb-3 group-hover:scale-110 transition-transform`}
                />
                <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                  {action.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                  {action.description}
                </p>
                <div className="flex items-center text-red-600 dark:text-red-400 font-medium">
                  <span className="text-sm">Get Started</span>
                  <ArrowRight
                    size={16}
                    className="ml-2 group-hover:translate-x-2 transition-transform"
                  />
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Recent Accidents */}
        <Card>
          <CardBody className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                Recent Accidents
              </h2>
              {recentAccidents.length > 0 && (
                <button
                  onClick={() => router.push("/accidents/list")}
                  className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 font-medium text-sm flex items-center"
                >
                  View All
                  <ArrowRight size={16} className="ml-1" />
                </button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 dark:border-red-500"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">
                  Loading...
                </span>
              </div>
            ) : recentAccidents.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <AlertCircle
                    size={40}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  No accidents reported yet
                </p>
                <button
                  onClick={() => router.push("/accidents/report")}
                  className="px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium"
                >
                  Report Your First Accident
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {recentAccidents.map((accident) => (
                  <div
                    key={accident.id}
                    onClick={() => router.push(`/accidents/${accident.id}`)}
                    className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-400 dark:hover:border-red-500 hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer transition-all group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div
                        className={`p-3 rounded-lg bg-${getSeverityVariant(accident.severity)}-100 dark:bg-${getSeverityVariant(accident.severity)}-900/30 flex-shrink-0`}
                      >
                        <AlertCircle
                          size={24}
                          className={`text-${getSeverityVariant(accident.severity)}-600 dark:text-${getSeverityVariant(accident.severity)}-400`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
                          {accident.description.substring(0, 50)}...
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">
                          {accident.locationAddress || "Location not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0 ml-4">
                      <Badge variant={getSeverityVariant(accident.severity)}>
                        {accident.severity}
                      </Badge>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        {format(new Date(accident.createdAt), "MMM dd, HH:mm")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
