interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: "primary" | "secondary" | "error" | "tertiary";
}

const colorClasses = {
  primary:
    "bg-primary-container/20 text-primary group-hover:bg-primary group-hover:text-on-primary",
  secondary:
    "bg-secondary-container/30 text-secondary group-hover:bg-secondary group-hover:text-on-secondary",
  error:
    "bg-error-container/20 text-error-dim group-hover:bg-error group-hover:text-on-error",
  tertiary:
    "bg-tertiary-container/20 text-tertiary-dim group-hover:bg-tertiary group-hover:text-on-tertiary",
};

export default function StatCard({
  title,
  value,
  icon,
  color = "primary",
}: StatCardProps) {
  return (
    <div className="glass-panel rounded-xl p-6 glow-hover transition-all duration-300 group">
      <div className="flex justify-between items-start mb-4">
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${colorClasses[color]}`}
        >
          <span className="material-symbols-outlined text-[24px]">{icon}</span>
        </div>
      </div>
      <h3 className="text-3xl font-headline font-bold text-on-surface mb-1">
        {value}
      </h3>
      <p className="text-sm font-label text-on-surface-variant">{title}</p>
    </div>
  );
}
