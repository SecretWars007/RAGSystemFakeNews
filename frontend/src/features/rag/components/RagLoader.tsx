import { useEffect, useState, useRef } from "react";

interface Step {
  icon: string;
  label: string;
  duration: number;
}

const steps: Step[] = [
  { icon: "search",       label: "Buscando evidencias en la base vectorial...", duration: 1800 },
  { icon: "scatter_plot", label: "Calculando similitud semántica...",            duration: 1500 },
  { icon: "psychology",   label: "Evaluando con el modelo de lenguaje...",       duration: 2000 },
  { icon: "verified",     label: "Generando veredicto final...",                 duration: 900 },
];

export default function RagLoader() {
  const [activeStep, setActiveStep] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let current = 0;

    function advance() {
      current++;
      if (current < steps.length) {
        setActiveStep(current);
        intervalRef.current = setTimeout(advance, steps[current].duration);
      }
    }

    intervalRef.current = setTimeout(advance, steps[0].duration);

    return () => {
      if (intervalRef.current) clearTimeout(intervalRef.current);
    };
  }, []);

  return (
    <div className="glass-panel rounded-2xl p-8 scan-line animate-fade-in">
      {/* Spinner */}
      <div className="flex justify-center mb-6">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
          <div className="absolute inset-2 border-4 border-secondary/20 border-b-secondary rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "0.8s" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className="material-symbols-outlined text-primary text-2xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              {steps[activeStep]?.icon ?? "psychology"}
            </span>
          </div>
        </div>
      </div>

      {/* Steps */}
      <div className="space-y-3 max-w-sm mx-auto">
        {steps.map((step, idx) => {
          const isDone    = idx < activeStep;
          const isActive  = idx === activeStep;
          const isPending = idx > activeStep;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 transition-all duration-500
                ${isActive  ? "opacity-100" : ""}
                ${isDone    ? "opacity-60"  : ""}
                ${isPending ? "opacity-25"  : ""}
              `}
            >
              <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-colors
                ${isDone   ? "bg-primary text-on-primary"             : ""}
                ${isActive ? "bg-primary/20 border-2 border-primary"  : ""}
                ${isPending? "bg-surface-container-highest"           : ""}
              `}>
                {isDone ? (
                  <span className="material-symbols-outlined text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check
                  </span>
                ) : (
                  <span className={`text-xs font-label font-bold ${isActive ? "text-primary" : "text-on-surface-variant"}`}>
                    {idx + 1}
                  </span>
                )}
              </div>
              <p className={`text-sm font-label ${isActive ? "text-on-surface font-semibold" : "text-on-surface-variant"}`}>
                {step.label}
              </p>
              {isActive && (
                <span className="ml-auto flex gap-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="w-1.5 h-1.5 rounded-full bg-primary animate-bounce"
                      style={{ animationDelay: `${d * 0.15}s` }}
                    />
                  ))}
                </span>
              )}
            </div>
          );
        })}
      </div>

      <p className="text-center text-xs text-on-surface-variant/60 font-label mt-6">
        El análisis RAG puede tardar entre 5 y 30 segundos
      </p>
    </div>
  );
}
