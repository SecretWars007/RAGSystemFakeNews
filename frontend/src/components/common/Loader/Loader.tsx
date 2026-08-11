import type { LoaderProps } from "./Loader.types";

const sizes = {
  small: "text-xl",

  medium: "text-3xl",

  large: "text-5xl",
};

export default function Loader({
  size = "medium",

  text = "Procesando información...",
}: LoaderProps) {
  return (
    <div
      className="

            flex

            flex-col

            items-center

            justify-center

            gap-3

            "
    >
      <div
        className={`

                    animate-bounce

                    ${sizes[size]}

                    drop-shadow-md

                    `}
      >
        <span
          className="

                    text-[#40916C]

                    "
        >
          🐾
        </span>
      </div>

      {text && (
        <span
          className="

                        text-sm

                        font-medium

                        text-[#5E6C61]

                        "
        >
          {text}
        </span>
      )}
    </div>
  );
}
