import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div
      className="

            min-h-screen

            flex

            items-center

            justify-center

            bg-[#F4F8F5]

            px-4

            "
    >
      <div
        className="

                text-center

                "
      >
        <div
          className="

                    text-8xl

                    mb-6

                    "
        >
          🐶
        </div>

        <h1
          className="

                    text-6xl

                    font-bold

                    text-[#1B4332]

                    "
        >
          404
        </h1>

        <h2
          className="

                    mt-4

                    text-2xl

                    font-semibold

                    text-[#2D6A4F]

                    "
        >
          Página no encontrada
        </h2>

        <p
          className="

                    mt-3

                    text-[#5E6C61]

                    "
        >
          Tiko no encontró esta ruta en el sistema.
        </p>

        <Link
          to="/dashboard"

          className="

                    inline-flex

                    mt-8

                    px-6

                    py-3

                    rounded-xl

                    bg-[#40916C]

                    text-white

                    font-semibold

                    hover:bg-[#2D6A4F]

                    transition

                    "
        >
          Volver al Dashboard
        </Link>
      </div>
    </div>
  );
}
