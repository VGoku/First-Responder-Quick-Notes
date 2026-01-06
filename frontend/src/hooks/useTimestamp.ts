export default function useTimestamp() {
  return () => new Date().toISOString();
}
