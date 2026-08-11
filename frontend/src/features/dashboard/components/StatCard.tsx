import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color?: "primary" | "secondary" | "error" | "tertiary";
  trend?: string;
  trendUp?: boolean;
  loading?: boolean;
}

const colorConfig = {
  primary: {
    bg:       "bg-primary/10 group-hover:bg-primary",
    text:     "text-primary group-hover:text-on-primary",
    glow:     "group-hover:shadow-[0_0_30px_rgba(78,222,163,0.2)]",
    accent:   "text-primary",
  },
  secondary: {
    bg:       "bg-secondary-container/20 group-hover:bg-secondary-container",
    text:     "text-secondary group-hover:text-on-secondary-container",
    glow:     "group-hover:shadow-[0_0_30px_rgba(149,211,186,0.2)]",
    accent:   "text-secondary",
  },
  error: {
    bg:       "bg-error-container/20 group-hover:bg-error-container",
    text:     "text-error-dim group-hover:text-on-error-container",
    glow:     "group-hover:shadow-[0_0_30px_rgba(255,107,107,0.2)]",
    accent:   "text-error-dim",
  },
  tertiary: {
    bg:       "bg-tertiary-container/20 group-hover:bg-tertiary-container",
    text:     "text-tertiary-dim group-hover:text-on-tertiary-container",
    glow:     "group-hover:shadow-[0_0_30px_rgba(255,179,175,0.15)]",
    accent:   "text-tertiary-dim",
  },
};

function useCountUp(target: number, duration = 800) {
  const [count, setCount] = useState(0);
  const raf = useRef<number>(0);

  useEffect(() => {
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, [target, duration]);

  return count;
}

export default function StatCard({
  title,
  value,
  icon,
  color = "primary",
  trend,
  trendUp,
  loading = false,
}: StatCardProps) {
  const cfg = colorConfig[color];
  const numericValue = typeof value === "number" ? value : parseInt(value) || 0;
  const isNumeric = !isNaN(numericValue) && typeof parseInt(String(value)) === "number";
  const displayCount = useCountUp(isNumeric ? numericValue : 0);

  if (loading) {
    return (
      <div className="glass-panel rounded-xl p-6 space-y-4">
        <div className="flex justify-between">
          <div className="skeleton w-12 h-12 rounded-lg" />
        </div>
        <div className="skeleton h-9 w-1/2" />
        <div className="skeleton h-3 w-3/4" />
      </div>
    );
  }

  return (
    <div className={`glass-panel rounded-xl p-6 glow-hover transition-all duration-300 group cursor-default ${cfg.glow}`}>
      <div className="flex justify-between items-start mb-4">
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all duration-300 ${cfg.bg}`}>
          <span
            className={`material-symbols-outlined text-[22px] transition-all duration-300 ${cfg.text}`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            {icon}
          </span>
        </div>
        {trend && (
          <div className={`flex items-center gap-1 text-xs font-label font-semibold px-2 py-0.5 rounded-full
            ${trendUp
              ? "text-primary bg-primary/10"
              : "text-error-dim bg-error-container/20"
            }`}
          >
            <span className="material-symbols-outlined text-[12px]">
              {trendUp ? "trending_up" : "trending_down"}
            </span>
            {trend}
          </div>
        )}
      </div>
      <p className={`text-3xl font-headline font-black text-on-surface mb-1 count-up ${cfg.accent}`}>
        {isNumeric ? displayCount.toLocaleString() : value}
      </p>
      <p className="text-xs font-label text-on-surface-variant uppercase tracking-wider">{title}</p>
    </div>
  );
}
