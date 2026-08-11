import WelcomeCard from "../components/WelcomeCard";
import SystemStatus from "../components/SystemStatus";
import QuickActions from "../components/QuickActions";
import StatCard from "../components/StatCard";

export default function Dashboard() {
  return (
    <>
      <WelcomeCard />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Noticias Verificadas"
          value="301"
          icon="trending_up"
          color="primary"
        />
        <StatCard
          title="Análisis RAG Completados"
          value="87"
          icon="psychology"
          color="secondary"
        />
        <StatCard
          title="Noticias Falsas Detectadas"
          value="214"
          icon="gpp_bad"
          color="error"
        />
        <StatCard
          title="Usuarios Activos"
          value="25"
          icon="group"
          color="tertiary"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <QuickActions />
        <SystemStatus />
      </div>
    </>
  );
}
