export function formatTimestamp(ts?: string) {
  if (!ts) return "";
  const d = new Date(ts);
  return d.toLocaleString();
}
