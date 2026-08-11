export default function Header() {
  return (
    <header className="bg-surface border-b border-outline-variant/30 flex justify-between items-center px-6 py-4 w-full z-40 sticky top-0 md:h-20 h-16">
      <div className="flex items-center gap-4">
        <button className="md:hidden text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">menu</span>
        </button>
        <div className="hidden md:flex flex-col">
          <div className="flex items-center gap-2 text-sm text-on-surface-variant font-label">
            <span className="hover:text-primary cursor-pointer transition-colors">
              Sistema
            </span>
            <span className="material-symbols-outlined text-[16px]">
              chevron_right
            </span>
            <span className="text-primary font-medium">FakeNewsRAG</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-on-surface-variant text-sm bg-surface-container py-1.5 px-3 rounded-full border border-outline-variant/50">
          <span className="material-symbols-outlined text-[16px]">
            calendar_today
          </span>
          <span>
            {new Date().toLocaleDateString("es-ES", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
        <button className="text-on-surface-variant hover:text-primary transition-colors relative">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-0 right-0 w-2 h-2 bg-error rounded-full"></span>
        </button>
        <button className="text-on-surface-variant hover:text-primary transition-colors">
          <span className="material-symbols-outlined">settings</span>
        </button>
      </div>
    </header>
  );
}
