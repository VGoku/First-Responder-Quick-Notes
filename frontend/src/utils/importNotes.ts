import { Note } from "../types/Note";

export function importNotes(raw: string): Note[] {
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
