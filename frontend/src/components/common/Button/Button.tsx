import type { ButtonProps } from "./Button.types";

const variantStyles = {
  primary:
    "shimmer-btn bg-primary text-surface-container-lowest shadow-[0_4px_20px_rgba(16,185,129,0.3)] hover:shadow-[0_4px_25px_rgba(16,185,129,0.5)] hover:scale-[1.02]",
  secondary: "glass-panel text-on-surface hover:bg-surface-container-high hover:border-brand-emerald",
  outline: "border border-brand-emerald text-brand-emerald hover:bg-brand-emerald/10 hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]",
  danger: "bg-error text-white hover:bg-error-dim shadow-[0_4px_20px_rgba(239,68,68,0.2)]",
};

export default function Button({
  variant = "primary",
  loading = false,
  children,
  disabled,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      className={`
                inline-flex
                items-center
                justify-center
                gap-2
                px-4
                py-2.5
                rounded-2xl
                font-semibold
                transition-all
                duration-200
                disabled:opacity-50
                disabled:cursor-not-allowed
                active:scale-[0.99]
                ${variantStyles[variant]}
                ${className}
                `}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? "Procesando..." : children}
    </button>
  );
}
