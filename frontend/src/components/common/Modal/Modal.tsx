import type { ModalProps } from "./Modal.types";

export default function Modal({
  open,

  title,

  children,

  onClose,

  footer,
}: ModalProps) {
  if (!open) {
    return null;
  }

  return (
    <div
      className="
            fixed
            inset-0
            z-50
            flex
            items-center
            justify-center
            bg-black/40
            "
    >
      <div
        className="
                bg-white
                rounded-2xl
                shadow-xl
                w-full
                max-w-lg
                p-6
                "
      >
        <div
          className="
                    flex
                    justify-between
                    items-center
                    mb-5
                    "
        >
          <h2
            className="
                        text-xl
                        font-semibold
                        text-[#1B4332]
                        "
          >
            {title}
          </h2>

          <button
            onClick={onClose}

            className="
                        text-[#5E6C61]
                        hover:text-[#1B4332]
                        text-xl
                        "
          >
            ×
          </button>
        </div>

        <div>{children}</div>

        {footer && (
          <div
            className="
                            mt-6
                            flex
                            justify-end
                            gap-3
                            "
          >
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}
