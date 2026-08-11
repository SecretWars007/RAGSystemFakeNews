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
        <label className="text-sm font-medium text-[#123B2D]">{label}</label>
      )}

      <input
        className={`
                    w-full
                    px-4
                    py-3
                    rounded-2xl
                    border
                    border-[#D5E6DA]
                    bg-[#F8FBF9]
                    text-[#123B2D]
                    placeholder:text-[#7A8E84]
                    outline-none
                    transition-all
                    duration-200
                    focus:border-[#2E9C6D]
                    focus:ring-4
                    focus:ring-[#DDEFE8]
                    ${className}
                    `}
        {...props}
      />

      {error && <span className="text-sm text-[#D93F3F]">{error}</span>}
    </div>
  );
}
