/**
 * Matches a file against an `accept` attribute value (`image/*`, `.pdf`, `application/json`).
 * The file dialog filters on its own, dropped files have to be checked by hand.
 */
export function isAccepted(file: File, accept: string): boolean {
  const rules = accept
    .split(",")
    .map((rule) => rule.trim().toLowerCase())
    .filter(Boolean);

  if (!rules.length || rules.includes("*") || rules.includes("*/*")) return true;

  const name = file.name.toLowerCase();
  const type = file.type.toLowerCase();

  return rules.some((rule) => {
    if (rule.startsWith(".")) return name.endsWith(rule);
    if (rule.endsWith("/*")) return type.startsWith(rule.slice(0, -1));
    return type === rule;
  });
}
