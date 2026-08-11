import Card from "../../../components/common/Card";

export default function WelcomeCard() {
  return (
    <Card>
      <div
        className="
                flex
                items-center
                gap-6
                "
      >
        <div
          className="
                    text-6xl
                    "
        >
          🐶
        </div>

        <div>
          <h1
            className="
                        text-2xl
                        font-bold
                        text-[#1B4332]
                        "
          >
            Bienvenido a FakeNewsRAGSystem
          </h1>

          <p
            className="
                        mt-2
                        text-[#5E6C61]
                        "
          >
            Plataforma inteligente para detección de noticias falsas utilizando
            RAG, embeddings y modelos generativos.
          </p>
        </div>
      </div>
    </Card>
  );
}
