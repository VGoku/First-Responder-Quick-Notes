import type { Note } from "../types/Note";

/**
 * importNotes
 * -----------
 * Safely parses a JSON string into an array of Note objects.
 * This is used when importing notes from a file or clipboard.
 *
 * The function:
 * - Returns an empty array if parsing fails
 * - Ensures the parsed value is an array
 * - Performs light validation to avoid malformed data
 */
export function importNotes(rawJson: string): Note[] {
  try {
    const data = JSON.parse(rawJson);

    if (!Array.isArray(data)) return [];

    // Light validation: ensure each item has at least an id + content fields
    return data.filter((item) => {
      return (
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.content === "string"
      );
    }) as Note[];
  } catch {
    return [];
  }
}