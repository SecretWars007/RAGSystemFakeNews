export default function RagLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-12 space-y-6">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary/30 border-t-primary rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="material-symbols-outlined text-primary text-xl">
            psychology
          </span>
        </div>
      </div>

      <div className="text-center space-y-2">
        <h3 className="text-xl font-headline font-bold text-on-surface">
          Analizando con IA
        </h3>
        <p className="text-sm font-label text-on-surface-variant max-w-sm">
          Generando embeddings, recuperando contexto de la base vectorial y
          evaluando veracidad...
        </p>
      </div>
    </div>
  );
}
