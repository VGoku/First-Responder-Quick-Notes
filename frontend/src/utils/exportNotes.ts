import type { Note } from "../types/Note";

/**
 * exportNotes
 * -----------
 * Converts an array of Note objects into a formatted JSON string.
 * This is used when exporting notes so the user can download or
 * copy their data in a clean, readable format.
 *
 * Example output:
 * [
 *   {
 *     "id": "...",
 *     "title": "Example",
 *     "content": "Sample text",
 *     "timestamp": "2025-01-06T19:23:45.123Z"
 *   }
 * ]
 */
export function exportNotes(notes: Note[]) {
  return JSON.stringify(notes, null, 2);
}