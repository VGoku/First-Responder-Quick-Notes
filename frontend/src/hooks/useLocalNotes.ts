import { useState, useEffect } from "react";
import type { Note } from "../types/Note";

export default function useLocalNotes() {
  // Load notes lazily on first render
  const [notes, setNotes] = useState<Note[]>(() => {
    const raw = localStorage.getItem("notes");
    if (!raw) return [];
    try {
      return JSON.parse(raw);
    } catch {
      console.error("Failed to parse notes from localStorage");
      return [];
    }
  });

  // Save notes whenever they change
  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return { notes, setNotes };
}