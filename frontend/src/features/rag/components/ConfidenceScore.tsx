interface ConfidenceScoreProps {
  score: number;
}

export default function ConfidenceScore({ score }: ConfidenceScoreProps) {
  const percentage = Math.round(score * 100);

  const level =
    percentage >= 80
      ? "Alta confianza"
      : percentage >= 50
        ? "Confianza media"
        : "Baja confianza";

  return (
    <div
      className="
            space-y-3
            "
    >
      <div
        className="
                flex
                justify-between
                items-center
                "
      >
        <span
          className="
                    font-medium
                    text-[#1B4332]
                    "
        >
          Confianza del análisis
        </span>

        <span
          className="
                    font-bold
                    text-[#2E7D32]
                    "
        >
          {percentage}%
        </span>
      </div>

      <div
        className="
                h-3
                bg-[#E8F5E9]
                rounded-full
                overflow-hidden
                "
      >
        <div
          className="
                    h-full
                    bg-[#43A047]
                    rounded-full
                    transition-all
                    "

          style={{
            width: `${percentage}%`,
          }}
        />
      </div>

      <p
        className="
                text-sm
                text-[#5E6C61]
                "
      >
        {level}
      </p>
    </div>
  );
}
