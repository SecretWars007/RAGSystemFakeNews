import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
}

interface ToastContextValue {
  toasts: Toast[];
  toast: (opts: Omit<Toast, "id">) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (opts: Omit<Toast, "id">) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev, { ...opts, id }]);
      setTimeout(() => dismiss(id), 4200);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toasts, toast, dismiss }}>
      {children}
      <ToastContainer toasts={toasts} onDismiss={dismiss} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within ToastProvider");
  return ctx.toast;
}

const icons: Record<ToastType, string> = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
};

const styles: Record<ToastType, string> = {
  success: "border-l-4 border-primary bg-surface-container-high text-on-surface",
  error:   "border-l-4 border-error bg-error-container/30 text-on-error-container",
  warning: "border-l-4 border-tertiary bg-surface-container-high text-on-surface",
  info:    "border-l-4 border-secondary bg-surface-container-high text-on-surface",
};

const iconColors: Record<ToastType, string> = {
  success: "text-primary",
  error:   "text-error",
  warning: "text-tertiary",
  info:    "text-secondary",
};

function ToastContainer({
  toasts,
  onDismiss,
}: {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}) {
  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-enter pointer-events-auto flex items-start gap-3 px-4 py-3 rounded-xl shadow-2xl ${styles[t.type]} glass-panel-md`}
        >
          <span
            className={`material-symbols-outlined text-xl shrink-0 mt-0.5 ${iconColors[t.type]}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icons[t.type]}
          </span>
          <div className="flex-1 min-w-0">
            <p className="font-label font-semibold text-sm text-on-surface">{t.title}</p>
            {t.message && (
              <p className="text-xs text-on-surface-variant mt-0.5">{t.message}</p>
            )}
          </div>
          <button
            onClick={() => onDismiss(t.id)}
            className="text-on-surface-variant hover:text-on-surface transition-colors shrink-0"
          >
            <span className="material-symbols-outlined text-base">close</span>
          </button>
        </div>
      ))}
    </div>
  );
}
