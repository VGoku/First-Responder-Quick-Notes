/**
 * ViewNote Page
 * -------------
 * Displays a single note in a clean, readable layout.
 * Provides actions for editing, deleting, and exporting.
 * This page is used after selecting a note from the list.
 */

import type { Note } from "../types/Note";
import Button from "../components/Button";
import { formatTimestamp } from "../utils/formatTimestamp";

export default function ViewNote({
  note,
  onEdit,
  onDelete,
  onExport,
}: {
  note: Note;
  onEdit: () => void;
  onDelete: () => void;
  onExport: () => void;
}) {
  // If the note doesn't exist (bad ID, deleted, etc.)
  if (!note) {
    return <div className="p-6 text-white">Not found</div>;
  }

  return (
    <article className="max-w-3xl mx-auto p-6 rounded-lg bg-surface border border-white/10 shadow-md text-white">
      {/* Header: title + timestamp + actions */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{note.title}</h2>
          <div className="text-sm text-white/60">
            {formatTimestamp(note.timestamp)}
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="primary" onClick={onEdit}>
            Edit
          </Button>
          <Button variant="danger" onClick={onDelete}>
            Delete
          </Button>
          <Button variant="ghost" onClick={onExport}>
            Export
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="prose prose-invert text-white/90">
        <p>{note.content}</p>
      </div>
    </article>
  );
}