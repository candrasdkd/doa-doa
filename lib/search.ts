export function normalize(str: string) {
  return str
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "");
}

export function matchesQuery(text: string, q: string) {
  if (!q) return true;
  const t = normalize(text);
  const n = normalize(q);
  return t.includes(n);
}
