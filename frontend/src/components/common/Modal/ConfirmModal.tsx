import { useEffect, useRef, type ReactNode } from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "danger" | "warning" | "default";
  onConfirm: () => void;
  onCancel: () => void;
  children?: ReactNode;
}

const variantStyles = {
  danger:  { icon: "delete_forever", iconColor: "text-error",    btnClass: "bg-error-container text-on-error-container hover:bg-error hover:text-on-error" },
  warning: { icon: "warning",        iconColor: "text-tertiary",  btnClass: "bg-tertiary-container text-on-tertiary-container hover:opacity-90" },
  default: { icon: "help",           iconColor: "text-primary",   btnClass: "bg-primary text-on-primary hover:opacity-90" },
};

export default function ConfirmModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  variant = "default",
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const v = variantStyles[variant];

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onCancel]);

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={(e) => { if (e.target === overlayRef.current) onCancel(); }}
    >
      <div className="glass-panel-md emerald-glow rounded-2xl p-6 max-w-sm w-full animate-slide-up">
        {/* Icon */}
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0">
            <span
              className={`material-symbols-outlined text-2xl ${v.iconColor}`}
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {v.icon}
            </span>
          </div>
          <div>
            <h2 className="font-headline font-bold text-on-surface text-lg">{title}</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">{message}</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 justify-end mt-6">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded-lg text-sm font-label font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high transition-colors border border-outline-variant/30"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`px-4 py-2 rounded-lg text-sm font-label font-semibold transition-all ${v.btnClass}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
