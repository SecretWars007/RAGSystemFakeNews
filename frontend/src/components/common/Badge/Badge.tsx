import type { BadgeProps } from "./Badge.types";

const styles = {
  success: `
        bg-primary-container/20
        text-primary
        border border-primary/30
        `,

  warning: `
        bg-yellow-900/30
        text-yellow-400
        border border-yellow-500/30
        `,

  danger: `
        bg-error-container/20
        text-error
        border border-error/30
        `,

  info: `
        bg-secondary-container/20
        text-secondary
        border border-secondary/30
        `,

  default: `
        bg-surface-variant
        text-on-surface-variant
        border border-outline-variant
        `,
};

export default function Badge({
  variant = "default",children,
}: BadgeProps) {
  return (
    <span
      className={`
                inline-flex

                items-center

                px-3

                py-1

                rounded-full

                text-xs

                font-semibold

                ${styles[variant]}

                `}
    >
      {children}
    </span>
  );
}
