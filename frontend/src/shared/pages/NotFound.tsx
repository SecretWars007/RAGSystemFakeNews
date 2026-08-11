import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
      {/* Glowing 404 */}
      <div className="relative mb-8">
        <div className="absolute inset-0 blur-3xl bg-primary opacity-10 rounded-full scale-150 pointer-events-none" />
        <p className="relative font-headline font-black text-[8rem] md:text-[12rem] leading-none bg-gradient-to-b from-primary to-brand-emerald bg-clip-text text-transparent select-none">
          404
        </p>
      </div>

      {/* Icon */}
      <div className="w-20 h-20 rounded-2xl bg-surface-container-high border border-outline-variant/30 flex items-center justify-center mb-6 shadow-[0_0_40px_rgba(16,185,129,0.1)]">
        <span
          className="material-symbols-outlined text-4xl text-primary"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          search_off
        </span>
      </div>

      <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface mb-3">
        Página no encontrada
      </h1>
      <p className="text-on-surface-variant font-body max-w-md mb-8">
        La ruta que buscas no existe o fue movida. Regresa al panel principal para continuar.
      </p>

      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-label font-semibold text-on-surface-variant bg-surface-container hover:bg-surface-container-high border border-outline-variant/30 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">arrow_back</span>
          Atrás
        </button>
        <button
          onClick={() => navigate("/dashboard")}
          className="shimmer-btn flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-label font-semibold bg-gradient-to-r from-brand-emerald to-primary text-on-primary shadow-lg hover:opacity-90 transition-all"
        >
          <span className="material-symbols-outlined text-[16px]">home</span>
          Ir al Dashboard
        </button>
      </div>
    </div>
  );
}
