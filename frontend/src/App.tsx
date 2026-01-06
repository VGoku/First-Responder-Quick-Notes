/**
 * App.tsx
 * -------
 * Root component that manages:
 * - Navigation between Home, New Note, and View Note screens
 * - Local note storage (via useLocalNotes)
 * - Creating, deleting, and exporting notes
 *
 * This acts as a simple state machine using the `view` object.
 */

import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";
import Button from "./components/Button";
import NoteCard from "./components/NoteCard";

import NewNote from "./pages/NewNote";
import ViewNote from "./pages/ViewNote";

import useLocalNotes from "./hooks/useLocalNotes";
import type { Note } from "./types/Note";

// Defines which screen is currently active
type ViewState =
  | { name: "home" }
  | { name: "new" }
  | { name: "view"; id: string };

function App() {
  const [view, setView] = useState<ViewState>({ name: "home" });
  const { notes, setNotes } = useLocalNotes();

  /**
   * Saves a new note and navigates to its detail view.
   */
  function handleSave(note: Note) {
    setNotes([note, ...notes]);
    setView({ name: "view", id: note.id });
  }

  /**
   * Deletes a note and returns to the home screen.
   */
  function handleDelete(id: string) {
    setNotes(notes.filter((n) => n.id !== id));
    setView({ name: "home" });
  }

  /**
   * Exports a note as a JSON file.
   */
  function handleExport(note: Note) {
    const blob = new Blob([JSON.stringify(note, null, 2)], {
      type: "application/json",
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.href = url;
    a.download = `${note.id}.json`;
    a.click();

    URL.revokeObjectURL(url);
  }

  // Find the note currently being viewed (if any)
  const currentNote =
    view.name === "view" ? notes.find((n) => n.id === view.id) : null;

  return (
    <div className="min-h-screen bg-bg text-white font-inter">
      <Navbar />

      <main className="max-w-4xl mx-auto p-6">
        {/* HOME SCREEN */}
        {view.name === "home" && (
          <section>
            <div className="flex flex-col items-center gap-6 mb-8">
              <h1 className="text-3xl font-semibold">
                Quick Notes for First Responders
              </h1>
              <p className="text-white/70">
                Capture vital info fast — timestamp, location, and tags.
              </p>

              <Button
                variant="primary"
                className="px-6 py-3 text-lg"
                onClick={() => setView({ name: "new" })}
              >
                + Create New Note
              </Button>
            </div>

            <div className="grid gap-4">
              {notes.length === 0 && (
                <div className="text-center text-white/60">No recent notes</div>
              )}

              {notes.map((n) => (
                <NoteCard
                  key={n.id}
                  note={n}
                  onClick={() => setView({ name: "view", id: n.id })}
                />
              ))}
            </div>
          </section>
        )}

        {/* NEW NOTE SCREEN */}
        {view.name === "new" && (
          <NewNote
            onSave={handleSave}
            onCancel={() => setView({ name: "home" })}
          />
        )}

        {/* VIEW NOTE SCREEN */}
        {view.name === "view" && currentNote && (
          <ViewNote
            note={currentNote}
            onEdit={() => setView({ name: "new" })} // Editing not implemented yet
            onDelete={() => handleDelete(currentNote.id)}
            onExport={() => handleExport(currentNote)}
          />
        )}
      </main>
    </div>
  );
}

export default App;