import type {
    ButtonProps,
} from "./Button.types";

const variantStyles = {
    primary:
        "bg-[#1F7A4E] text-white shadow-[0_10px_20px_rgba(31,122,78,0.22)] hover:bg-[#185F3F]",
    secondary:
        "bg-[#2E9C6D] text-white hover:bg-[#237E5A]",
    outline:
        "border border-[#D3E8DA] bg-white text-[#123B2D] hover:bg-[#F2FAF4]",
    danger:
        "bg-[#D93F3F] text-white hover:bg-[#B93232]",
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
            className={
                `
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
                `
            }
            disabled={disabled || loading}
            {...props}
        >
            {loading ? "Procesando..." : children}
        </button>
    );
}
