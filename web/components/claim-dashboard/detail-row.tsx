export function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-0.5 sm:grid-cols-[minmax(0,160px)_1fr] sm:items-start">
      <span className="text-xs font-medium tracking-wide text-muted uppercase">{label}</span>
      <span className="text-sm wrap-break-word text-foreground">{value}</span>
    </div>
  );
}
