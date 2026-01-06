import React from "react";
import { Note } from "../types/Note";

export default function NoteCard({ note }: { note: Note }) {
  return (
    <article className="p-4 border rounded bg-white/5 text-white">
      <h3 className="font-bold">{note.title}</h3>
      <p className="text-sm">{note.content}</p>
    </article>
  );
}
