/**
 * Emergency Services Page
 * View and manage emergency service requests
 */

"use client";

import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layouts/dashboard-layout";
import { Card, CardBody, Badge } from "@/components/ui";
import {
  Ambulance,
  Phone,
  MapPin,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
} from "lucide-react";

export default function EmergencyServicesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [services, setServices] = useState<any[]>([]);

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              Emergency Services
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Track and manage emergency service dispatches
            </p>
          </div>
          <button className="px-6 py-3 bg-red-600 dark:bg-red-500 text-white rounded-lg hover:bg-red-700 dark:hover:bg-red-600 transition-colors font-medium shadow-lg hover:shadow-xl">
            <div className="flex items-center gap-2">
              <Ambulance size={20} />
              <span>Request Service</span>
            </div>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Active Dispatches
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    0
                  </p>
                </div>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                  <Ambulance
                    size={28}
                    className="text-blue-600 dark:text-blue-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Completed Today
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    0
                  </p>
                </div>
                <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-xl">
                  <CheckCircle
                    size={28}
                    className="text-green-600 dark:text-green-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
                    Avg Response Time
                  </p>
                  <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                    8 min
                  </p>
                </div>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                  <Clock
                    size={28}
                    className="text-purple-600 dark:text-purple-400"
                  />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Services List */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Recent Dispatches
            </h2>

            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600 dark:border-red-500"></div>
                <span className="ml-3 text-gray-600 dark:text-gray-400">
                  Loading...
                </span>
              </div>
            ) : services.length === 0 ? (
              <div className="text-center py-12">
                <div className="p-4 bg-gray-100 dark:bg-gray-700 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center">
                  <Ambulance
                    size={40}
                    className="text-gray-400 dark:text-gray-500"
                  />
                </div>
                <p className="text-gray-600 dark:text-gray-400 mb-2 text-lg font-medium">
                  No emergency services dispatched yet
                </p>
                <p className="text-gray-500 dark:text-gray-500 text-sm">
                  Emergency services will be automatically dispatched when
                  accidents are reported
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Service items would go here */}
              </div>
            )}
          </CardBody>
        </Card>

        {/* Emergency Contacts */}
        <Card>
          <CardBody className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Emergency Contacts
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-red-400 dark:hover:border-red-500 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                    <Phone
                      size={20}
                      className="text-red-600 dark:text-red-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Emergency Hotline
                    </h3>
                    <p className="text-lg font-bold text-red-600 dark:text-red-400 mt-1">
                      911
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-400 dark:hover:border-blue-500 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <Ambulance
                      size={20}
                      className="text-blue-600 dark:text-blue-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Ambulance Service
                    </h3>
                    <p className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-1">
                      1-800-AMBULANCE
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-green-400 dark:hover:border-green-500 transition-colors">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <MapPin
                      size={20}
                      className="text-green-600 dark:text-green-400"
                    />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                      Traffic Police
                    </h3>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400 mt-1">
                      1-800-TRAFFIC
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </DashboardLayout>
  );
}
