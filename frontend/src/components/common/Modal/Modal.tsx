import { useEffect } from "react";
import { createPortal } from "react-dom";
import type { ModalProps } from "./Modal.types";

export default function Modal({
  open,
  title,
  children,
  onClose,
  footer,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <button
        type="button"
        className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm border-0 cursor-default"
        onClick={onClose}
        aria-label="Cerrar modal"
        tabIndex={-1}
      />

      {/* Dialog content */}
      <dialog
        open
        className="relative z-10 m-0 p-0 bg-transparent border-0 block w-full max-w-2xl"
      >
        <div className="glass-panel-md emerald-glow bg-surface-container-high border border-outline-variant/20 rounded-2xl shadow-2xl w-full p-6 animate-slide-up overflow-y-auto max-h-[90vh]">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-headline font-bold text-on-surface">
              {title}
            </h2>
            <button
              type="button"
              onClick={onClose}
              className="text-on-surface-variant hover:text-on-surface hover:bg-surface-variant p-1.5 rounded-lg text-2xl leading-none transition-colors"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>
          </div>

          <div>{children}</div>

          {footer && (
            <div className="mt-6 flex justify-end gap-3 pt-4 border-t border-outline-variant/20">
              {footer}
            </div>
          )}
        </div>
      </dialog>
    </div>,
    document.body
  );
}
