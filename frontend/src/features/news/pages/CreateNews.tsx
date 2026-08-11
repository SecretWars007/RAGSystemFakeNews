import { useState } from "react";

import { useNavigate } from "react-router-dom";

import Card from "../../../components/common/Card";

import Input from "../../../components/common/Input";

import TextArea from "../../../components/common/TextArea";

import Button from "../../../components/common/Button";

import { createNews } from "../services/newsService";

export default function CreateNews() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");

  const [source, setSource] = useState("");

  const [content, setContent] = useState("");

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    setLoading(true);

    setError("");

    try {
      await createNews({
        title,

        source,

        content,
      });

      navigate("/news");
    } catch {
      setError("No se pudo crear la noticia");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="
            max-w-4xl
            mx-auto
            "
    >
      <Card>
        <h1
          className="
                    text-2xl
                    font-bold
                    text-[#1B4332]
                    mb-6
                    "
        >
          Crear noticia
        </h1>

        <form
          onSubmit={handleSubmit}

          className="
                    space-y-6
                    "
        >
          <Input
            label="Título"

            placeholder="
                        Título de la noticia
                        "

            value={title}

            onChange={(e) => setTitle(e.target.value)}
          />

          <Input
            label="Fuente"

            placeholder="
                        Fuente de información
                        "

            value={source}

            onChange={(e) => setSource(e.target.value)}
          />

          <TextArea
            label="Contenido"

            placeholder="
                        Escriba el contenido completo
                        "

            rows={8}

            value={content}

            onChange={(e) => setContent(e.target.value)}
          />

          {error && (
            <p
              className="
                                text-red-600
                                "
            >
              {error}
            </p>
          )}

          <div
            className="
                        flex
                        justify-end
                        gap-4
                        "
          >
            <Button
              type="button"

              variant="outline"

              onClick={() => navigate("/news")}
            >
              Cancelar
            </Button>

            <Button
              type="submit"

              disabled={loading}
            >
              {loading ? "Guardando..." : "Guardar"}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
