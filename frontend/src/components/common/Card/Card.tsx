import type {
    CardProps,
} from "./Card.types";


export default function Card({
    title,
    description,
    children,
    className = "",
}: CardProps) {
    return (
        <section
            className={
                `
                bg-white/90
                rounded-3xl
                border
                border-[#DCEDE2]
                shadow-[0_12px_35px_rgba(27,67,50,0.08)]
                p-6
                backdrop-blur-sm
                ${className}
                `
            }
        >
            {title && (
                <h2 className="mb-2 text-lg font-semibold text-[#123B2D]">
                    {title}
                </h2>
            )}

            {description && (
                <p className="mb-4 text-sm text-[#5C6F66]">{description}</p>
            )}

            <div>{children}</div>
        </section>
    );
}