import { useState, useEffect } from "react";
import { Note } from "../types/Note";

export default function useLocalNotes() {
  const [notes, setNotes] = useState<Note[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("notes");
    if (raw) setNotes(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return { notes, setNotes };
}
