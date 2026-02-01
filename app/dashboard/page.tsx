/**
 * Dashboard Page
 * Main dashboard with stats and recent accidents
 */

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { accidentService, type Accident, AccidentSeverity } from "@/lib/api";
import { AlertCircle, Ambulance, TrendingUp, Clock } from "lucide-react";
import { format } from "date-fns";

export default function DashboardPage() {
  const [recentAccidents, setRecentAccidents] = useState<Accident[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const response = await accidentService.getAccidents({ limit: 5 });
      setRecentAccidents(response.data);
    } catch (error) {
      console.error("Failed to load dashboard data", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getSeverityColor = (severity: AccidentSeverity) => {
    switch (severity) {
      case 'critical':
        return "text-red-600 bg-red-50";
      case 'severe':
        return "text-orange-600 bg-orange-50";
      case 'moderate':
        return "text-yellow-600 bg-yellow-50";
      case 'minor':
        return "text-green-600 bg-green-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  const stats = [
    {
      title: "Total Accidents",
      value: recentAccidents.length,
      icon: AlertCircle,
      color: "text-red-600 bg-red-50",
    },
    {
      title: "Active Dispatches",
      value: "0",
      icon: Ambulance,
      color: "text-blue-600 bg-blue-50",
    },
    {
      title: "Response Time",
      value: "8 min",
      icon: Clock,
      color: "text-green-600 bg-green-50",
    },
    {
      title: "This Month",
      value: recentAccidents.length,
      icon: TrendingUp,
      color: "text-purple-600 bg-purple-50",
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    {stat.title}
                  </p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-lg ${stat.color}`}>
                  <stat.icon size={24} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <button
            onClick={() => router.push("/accidents/report")}
            className="bg-red-600 text-white p-6 rounded-lg shadow-lg hover:bg-red-700 transition-colors"
          >
            <AlertCircle size={32} className="mb-3" />
            <h3 className="text-xl font-bold">Report Accident</h3>
            <p className="text-red-100 mt-2">
              Submit a new accident report with AI analysis
            </p>
          </button>

          <button
            onClick={() => router.push("/accidents/list")}
            className="bg-blue-600 text-white p-6 rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
          >
            <AlertCircle size={32} className="mb-3" />
            <h3 className="text-xl font-bold">View Accidents</h3>
            <p className="text-blue-100 mt-2">
              See all reported accidents and their status
            </p>
          </button>

          <button
            onClick={() => router.push("/vehicles")}
            className="bg-green-600 text-white p-6 rounded-lg shadow-lg hover:bg-green-700 transition-colors"
          >
            <AlertCircle size={32} className="mb-3" />
            <h3 className="text-xl font-bold">My Vehicles</h3>
            <p className="text-green-100 mt-2">
              Manage your registered vehicles
            </p>
          </button>
        </div>

        {/* Recent Accidents */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            Recent Accidents
          </h2>

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <span className="ml-3 text-gray-600">Loading...</span>
            </div>
          ) : recentAccidents.length === 0 ? (
            <div className="text-center py-12">
              <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
              <p className="text-gray-600">No accidents reported yet</p>
              <button
                onClick={() => router.push("/accidents/report")}
                className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Report Your First Accident
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {recentAccidents.map((accident) => (
                <div
                  key={accident.id}
                  onClick={() => router.push(`/accidents/${accident.id}`)}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-red-300 hover:bg-gray-50 cursor-pointer transition-all"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-3 rounded-lg ${getSeverityColor(accident.severity)}`}
                    >
                      <AlertCircle size={24} />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {accident.description.substring(0, 50)}...
                      </h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {accident.locationAddress || "Location not specified"}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${getSeverityColor(
                        accident.severity,
                      )}`}
                    >
                      {accident.severity}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      {format(new Date(accident.createdAt), "MMM dd, HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {recentAccidents.length > 0 && (
            <button
              onClick={() => router.push("/accidents/list")}
              className="mt-6 w-full py-3 text-red-600 font-semibold hover:bg-red-50 rounded-lg transition-colors"
            >
              View All Accidents
            </button>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
