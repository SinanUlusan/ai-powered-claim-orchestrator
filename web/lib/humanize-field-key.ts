/** Fallback label when a JSON field key has no i18n entry (unknown step shapes). */
export function humanizeFieldKey(key: string): string {
  if (!key) return key;
  const spaced = key.replace(/([A-Z])/g, " $1").trim();
  if (!spaced) return key;
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}
