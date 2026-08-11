import type { InputProps } from "./Input.types";

export default function Input({
  label,
  error,
  className = "",
  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-label text-on-surface-variant ml-1">{label}</label>
      )}

      <input
        className={`
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    border
                    border-outline-variant
                    bg-surface-container-high
                    text-on-surface
                    placeholder:text-on-surface-variant/50
                    outline-none
                    transition-all
                    duration-300
                    focus:border-brand-emerald
                    focus:ring-1
                    focus:ring-brand-emerald
                    focus:shadow-[0_0_15px_rgba(16,185,129,0.15)]
                    ${className}
                    `}
        {...props}
      />

      {error && <span className="text-sm text-[#D93F3F]">{error}</span>}
    </div>
  );
}
