import type { CardProps } from "./Card.types";

export default function Card({
  title,
  description,
  children,
  className = "",
}: CardProps) {
  return (
    <section
      className={`
                glass-panel
                rounded-3xl
                border
                border-brand-emerald/20
                shadow-[0_12px_35px_rgba(0,0,0,0.5)]
                p-6
                ${className}
                `}
    >
      {title && (
        <h2 className="mb-2 text-xl font-headline font-semibold text-on-surface">{title}</h2>
      )}

      {description && (
        <p className="mb-4 text-sm font-body text-on-surface-variant">{description}</p>
      )}

      <div>{children}</div>
    </section>
  );
}
