import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import Card from "../../../components/common/Card";

import Input from "../../../components/common/Input";

import Button from "../../../components/common/Button";

import Loader from "../../../components/common/Loader";

import { register } from "../services/authService";

export default function Register() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setError("");

    setLoading(true);

    try {
      await register({
        email,

        password,
      });

      navigate("/login");
    } catch {
      setError("No se pudo registrar el usuario");
    } finally {
      setLoading(false);
    }
  }

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
      <Card>
        <div
          className="

                    w-full

                    max-w-md

                    "
        >
          <div
            className="

                        text-center

                        mb-8

                        "
          >
            <div
              className="

                            text-6xl

                            mb-4

                            "
            >
              🐶
            </div>

            <h1
              className="

                            text-2xl

                            font-bold

                            text-[#1B4332]

                            "
            >
              Crear cuenta
            </h1>

            <p
              className="

                            text-[#5E6C61]

                            mt-2

                            "
            >
              FakeNewsRAGSystem
            </p>
          </div>

          <form
            onSubmit={handleSubmit}

            className="

                        space-y-5

                        "
          >
            <Input
              label="Email"

              type="email"

              value={email}

              placeholder="

                            usuario@email.com

                            "

              onChange={(e) => setEmail(e.target.value)}
            />

            <Input
              label="Password"

              type="password"

              value={password}

              placeholder="

                            ********

                            "

              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p
                className="

                                    text-red-600

                                    text-sm

                                    "
              >
                {error}
              </p>
            )}

            {loading && (
              <Loader
                size="small"

                text="Creando usuario..."
              />
            )}

            <Button
              type="submit"

              disabled={loading}
            >
              {loading ? "Procesando..." : "Registrarse"}
            </Button>
          </form>

          <div
            className="

                        text-center

                        mt-6

                        "
          >
            <span
              className="

                            text-[#5E6C61]

                            "
            >
              ¿Ya tienes cuenta?
            </span>

            <Link
              to="/login"

              className="

                            ml-2

                            text-[#2D6A4F]

                            font-semibold

                            "
            >
              Ingresar
            </Link>
          </div>
        </div>
      </Card>
    </div>
  );
}
