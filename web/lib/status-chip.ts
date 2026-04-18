export function statusToChipColor(status: string): "default" | "accent" | "success" | "warning" | "danger" {
  const s = status.toLowerCase();
  if (s.includes("complete")) return "success";
  if (s.includes("progress")) return "accent";
  if (s.includes("pending")) return "warning";
  return "default";
}
