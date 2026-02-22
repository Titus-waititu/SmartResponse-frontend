import { create } from "zustand";
import { notificationService } from "@/lib/api/services";
import { useAuthStore } from "@/lib/stores/auth.store";
import type { Notification } from "@/lib/api/types";

interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  isLoading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
}

export const useNotificationStore = create<NotificationState>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  isLoading: false,
  error: null,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await notificationService.getNotifications();
      const notifications = response?.data || [];
      const unreadCount = notifications.filter((n) => !n.isRead).length;
      set({ notifications, unreadCount, isLoading: false });
    } catch (error) {
      set({
        error: "Failed to fetch notifications",
        isLoading: false,
        notifications: [],
      });
      console.error("Error fetching notifications:", error);
    }
  },

  markAsRead: async (id: string) => {
    try {
      await notificationService.markAsRead(id);
      const { notifications } = get();
      const updated = notifications.map((n) =>
        n.id === id ? { ...n, isRead: true } : n,
      );
      const unreadCount = updated.filter((n) => !n.isRead).length;
      set({ notifications: updated, unreadCount });
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  },

  markAllAsRead: async () => {
    try {
      const userId = useAuthStore.getState().user?.id;
      if (!userId) return;

      await notificationService.markAllAsRead(userId);
      const { notifications } = get();
      const updated = notifications.map((n) => ({ ...n, isRead: true }));
      set({ notifications: updated, unreadCount: 0 });
    } catch (error) {
      console.error("Error marking all as read:", error);
    }
  },

  deleteNotification: async (id: string) => {
    try {
      await notificationService.deleteNotification(id);
      const { notifications } = get();
      const filtered = notifications.filter((n) => n.id !== id);
      const unreadCount = filtered.filter((n) => !n.isRead).length;
      set({ notifications: filtered, unreadCount });
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  },
}));
