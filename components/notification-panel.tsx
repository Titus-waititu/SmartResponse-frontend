"use client";

import { useEffect, useRef } from "react";
import { useNotificationStore } from "@/lib/stores/notification.store";
import { Bell, CheckCheck, Trash2, X } from "lucide-react";
import type { Notification } from "@/lib/api/types";

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const {
    notifications,
    unreadCount,
    isLoading,
    error,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
  } = useNotificationStore();

  // Fetch notifications on mount
  useEffect(() => {
    if (isOpen) {
      fetchNotifications();
    }
  }, [isOpen]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const getNotificationIcon = (type: Notification["type"]) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "accident_assigned":
        return <div className={`${iconClass} bg-red-500 rounded-full`} />;
      case "accident_updated":
        return <div className={`${iconClass} bg-blue-500 rounded-full`} />;
      case "service_dispatched":
        return <div className={`${iconClass} bg-purple-500 rounded-full`} />;
      case "service_completed":
        return <div className={`${iconClass} bg-green-500 rounded-full`} />;
      default:
        return <Bell className={iconClass} />;
    }
  };

  const getPriorityColor = (priority: Notification["priority"]) => {
    switch (priority) {
      case "high":
        return "text-red-500";
      case "medium":
        return "text-yellow-500";
      case "low":
        return "text-gray-500";
      default:
        return "text-gray-400";
    }
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleNotificationClick = (notification: Notification) => {
    if (!notification.isRead) {
      markAsRead(notification.id);
    }
    // Navigate to accident detail if accidentId exists
    if (notification.accidentId) {
      window.location.href = `/accidents/${notification.accidentId}`;
    }
  };

  return (
    <div
      ref={panelRef}
      className="absolute right-0 top-12 w-96 bg-surface border border-border rounded-xl shadow-xl overflow-hidden z-50"
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-surface-hover flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Bell className="w-5 h-5 text-text-primary" />
          <h3 className="font-semibold text-text-primary">Notifications</h3>
          {unreadCount > 0 && (
            <span className="px-2 py-0.5 bg-primary text-white text-xs rounded-full">
              {unreadCount}
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-surface rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-text-secondary" />
        </button>
      </div>

      {/* Actions */}
      {notifications.length > 0 && (
        <div className="px-4 py-2 bg-surface-hover border-b border-border flex items-center justify-between">
          <button
            onClick={() => markAllAsRead()}
            className="text-xs text-primary hover:text-primary-dark font-medium flex items-center gap-1"
          >
            <CheckCheck className="w-3.5 h-3.5" />
            Mark all read
          </button>
        </div>
      )}

      {/* Notifications List */}
      <div className="max-h-128 overflow-y-auto">
        {isLoading ? (
          <div className="p-8 text-center text-text-secondary">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full mx-auto" />
            <p className="mt-2 text-sm">Loading notifications...</p>
          </div>
        ) : error ? (
          <div className="p-8 text-center text-danger">
            <p className="text-sm">{error}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center">
            <Bell className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
            <p className="text-text-secondary text-sm">No notifications yet</p>
            <p className="text-text-tertiary text-xs mt-1">
              We&apos;ll notify you when something important happens
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 hover:bg-surface-hover transition-colors cursor-pointer group ${
                  !notification.isRead ? "bg-primary/5" : ""
                }`}
                onClick={() => handleNotificationClick(notification)}
              >
                <div className="flex gap-3">
                  <div className="shrink-0 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p
                        className={`text-sm font-medium ${
                          !notification.isRead
                            ? "text-text-primary"
                            : "text-text-secondary"
                        }`}
                      >
                        {notification.title}
                      </p>
                      {!notification.isRead && (
                        <div className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                      )}
                    </div>
                    <p className="text-xs text-text-tertiary mt-1 line-clamp-2">
                      {notification.message}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span
                        className={`text-xs uppercase ${getPriorityColor(notification.priority)}`}
                      >
                        {notification.priority}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {formatDate(notification.createdAt)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm("Delete this notification?")) {
                        deleteNotification(notification.id);
                      }
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-surface rounded transition-all"
                  >
                    <Trash2 className="w-4 h-4 text-text-tertiary hover:text-danger" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
