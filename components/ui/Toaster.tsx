"use client";

import {
  useToastStore,
  type Toast,
  type ToastVariant,
} from "@/lib/stores/toastStore";

// ---------------------------------------------------------------------------
// Per-variant Tailwind colour classes
// ---------------------------------------------------------------------------
const VARIANT_STYLES: Record<ToastVariant, string> = {
  info: "bg-blue-600 text-white",
  success: "bg-green-600 text-white",
  warning: "bg-yellow-500 text-white",
  error: "bg-red-600 text-white",
};

// ---------------------------------------------------------------------------
// Single toast item
// ---------------------------------------------------------------------------
function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
  return (
    <div
      role="alert"
      className={`flex items-center justify-between gap-4 rounded-md px-4 py-3 shadow-lg ${VARIANT_STYLES[toast.variant]}`}
    >
      <span className="text-sm leading-snug">{toast.message}</span>
      <button
        aria-label="Dismiss notification"
        onClick={onClose}
        className="shrink-0 text-white/80 hover:text-white text-xl leading-none"
      >
        &times;
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Toaster — fixed overlay rendered at the app root
// ---------------------------------------------------------------------------
export function Toaster() {
  const { toasts, removeToast } = useToastStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="false"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-80"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
}
