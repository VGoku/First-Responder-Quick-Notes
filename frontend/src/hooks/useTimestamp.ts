/**
 * useTimestamp
 * ------------
 * A tiny custom hook that returns a function for generating
 * ISO‑formatted timestamps. This keeps timestamp creation
 * consistent across the app and makes it easy to mock or
 * replace later if needed.
 *
 * Example output:
 *   "2025-01-06T19:23:45.123Z"
 */
export default function useTimestamp() {
  // Return a function so the timestamp is generated on demand
  return () => new Date().toISOString();
}