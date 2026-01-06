import { Note } from "../types/Note";

export function exportNotes(notes: Note[]) {
  return JSON.stringify(notes, null, 2);
}
