/**
 * formatTimestamp
 * ----------------
 * Converts an ISO timestamp string into a readable, localized
 * date/time format. This keeps all timestamps consistent across
 * the app and ensures they display in the user's local timezone.
 *
 * Example:
 *   "2025-01-06T19:23:45.123Z" -> "1/6/2025, 1:23 PM"
 */
export function formatTimestamp(timestamp?: string) {
  if (!timestamp) return "";

  // Convert the ISO string into a Date object
  const date = new Date(timestamp);

  // Format using the user's locale settings
  return date.toLocaleString();
}