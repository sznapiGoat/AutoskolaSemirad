export function DemoBadge() {
  return (
    <div className="fixed bottom-4 right-4 z-[60] select-none">
      <span className="flex items-center gap-2 rounded-full border border-white/10 bg-dark/90 px-3.5 py-1.5 text-[11px] font-medium text-white/60 shadow-lg backdrop-blur">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
        Demo verze
      </span>
    </div>
  );
}
