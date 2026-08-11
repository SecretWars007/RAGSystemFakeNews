interface SkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: "sm" | "md" | "lg" | "full";
}

const roundedMap = {
  sm:   "rounded",
  md:   "rounded-lg",
  lg:   "rounded-xl",
  full: "rounded-full",
};

export function Skeleton({ className = "", rounded = "md" }: SkeletonProps) {
  return (
    <div className={`skeleton ${roundedMap[rounded]} ${className}`} aria-hidden="true" />
  );
}

export function SkeletonText({ lines = 2, className = "" }: { lines?: number; className?: string }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={`h-3 ${i === lines - 1 && lines > 1 ? "w-3/4" : "w-full"}`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`glass-panel rounded-xl p-6 space-y-4 ${className}`}>
      <div className="flex items-center gap-4">
        <Skeleton className="w-12 h-12" rounded="lg" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-4 w-1/2" />
          <Skeleton className="h-3 w-3/4" />
        </div>
      </div>
      <Skeleton className="h-8 w-1/3" />
    </div>
  );
}

export function SkeletonRow() {
  return (
    <tr className="border-b border-outline-variant/30">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <td key={i} className="px-6 py-4">
          <Skeleton className={`h-4 ${i === 2 ? "w-48" : i === 1 ? "w-20" : "w-24"}`} />
        </td>
      ))}
    </tr>
  );
}
