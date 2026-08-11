import { useAuthStore } from "../../../features/auth/store/authStore";

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Buenos días";
  if (h < 18) return "Buenas tardes";
  return "Buenas noches";
}

export default function WelcomeCard() {
  const user = useAuthStore((state) => state.user);
  const greeting = getGreeting();
  const name = user?.email?.split("@")[0] ?? "Investigador";

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-br from-primary/8 via-surface-container to-surface-container-high p-6 md:p-8 shadow-[0_4px_40px_rgba(16,185,129,0.08)]">
      {/* Decorative glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-primary opacity-5 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-secondary-container opacity-10 blur-2xl pointer-events-none" />

      <div className="relative flex flex-col md:flex-row md:items-center gap-5">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/15 border border-primary/20 flex items-center justify-center shrink-0 shadow-[0_0_20px_rgba(16,185,129,0.2)] overflow-hidden">
            <img src="/images/tiko_cartoon.png" alt="Tiko" className="w-full h-full object-cover" />
          </div>
          <div>
            <p className="text-xs font-label font-semibold text-primary uppercase tracking-widest mb-0.5">
              {greeting}
            </p>
            <h1 className="text-2xl md:text-3xl font-headline font-bold text-on-surface capitalize">
              {name}
            </h1>
          </div>
        </div>

        <div className="md:ml-auto">
          <p className="text-sm font-body text-on-surface-variant max-w-xs">
            Plataforma de detección de desinformación con{" "}
            <span className="text-primary font-semibold">RAG</span> y modelos generativos avanzados.
          </p>
        </div>
      </div>
    </div>
  );
}
