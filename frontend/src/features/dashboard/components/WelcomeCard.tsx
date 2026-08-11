import Card from "../../../components/common/Card";

export default function WelcomeCard() {
  return (
    <Card className="bg-gradient-to-br from-brand-emerald/10 to-transparent border-brand-emerald/30 shadow-[0_4px_30px_rgba(16,185,129,0.1)]">
      <div className="flex items-center gap-6">
        <div className="text-6xl drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]">
          🐶
        </div>

        <div>
          <h1 className="text-3xl font-headline font-bold text-on-surface tracking-tight">
            Bienvenido a <span className="text-brand-emerald">TIKO AI</span>
          </h1>

          <p className="mt-2 text-on-surface-variant font-body text-lg">
            Sabueso de las Noticias Falsas. Plataforma inteligente para detección de desinformación utilizando
            RAG y modelos generativos avanzados.
          </p>
        </div>
      </div>
    </Card>
  );
}
