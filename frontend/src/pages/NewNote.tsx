/**
 * NewNote Page
 * ------------
 * This screen allows the user to create a new note.
 * It collects title, content, tags, and automatically
 * attaches a timestamp and optional geolocation.
 */

import { useState } from "react";
import type { Note } from "../types/Note";
import Button from "../components/Button";
import useTimestamp from "../hooks/useTimestamp";
import useGeoLocation from "../hooks/useGeoLocation";

export default function NewNote({
  onSave,
  onCancel,
}: {
  onSave: (note: Note) => void;
  onCancel: () => void;
}) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags] = useState<string[]>([]);

  const getTimestamp = useTimestamp();
  const location = useGeoLocation();

  /**
   * Handles creating a new note object and passing it
   * back to the parent via onSave.
   */
  function handleSave() {
    const newNote: Note = {
      id: crypto.randomUUID(),
      title: title.trim(),
      content: content.trim(),
      tags,
      timestamp: getTimestamp(),
      location: location || undefined,
    };

    onSave(newNote);
  }

  return (
    <main className="p-6 text-white bg-bg min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Create New Note</h1>

      <div className="flex flex-col gap-4 max-w-xl">
        {/* Title */}
        <input
          className="p-3 rounded-md bg-surface border border-white/10 text-white"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* Content */}
        <textarea
          className="p-3 rounded-md bg-surface border border-white/10 text-white min-h-[150px]"
          placeholder="Write your note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        {/* Tags placeholder (you will connect TagSelector later) */}
        <div className="text-white/60 text-sm">
          Tags feature coming soon...
        </div>

        {/* Actions */}
<div className="flex gap-3">
  <Button variant="primary" onClick={handleSave}>
    Save Note
  </Button>

  <Button variant="ghost" onClick={onCancel}>
    Cancel
  </Button>
</div>
      </div>
    </main>
  );
}