import { useState } from "react";
import "./App.css";

import Navbar from "./components/Navbar";

import NewNote from "./pages/NewNote";
import ViewNote from "./pages/ViewNote";
import EMTDashboard from "./pages/EMTDashboard";
import EMTIncident from "./pages/EMTIncident";

import useLocalNotes from "./hooks/useLocalNotes";
import type { Note } from "./types/Note";

/**
 * ViewState controls which screen is visible.
 */
type ViewState =
  | { name: "home" }
  | { name: "new" }
  | { name: "view"; id: string }
  | { name: "emt" }
  | { name: "emt-incident" };

function App() {
  const [view, setView] = useState<ViewState>({ name: "home" });
  const { notes, setNotes } = useLocalNotes();

  /**
   * Save a new note and navigate to its detail view.
   */
  function handleSave(note: Note) {
    setNotes([note, ...notes]);
    setView({ name: "view", id: note.id });
  }

  /**
   * Delete a note and return to home.
   */
  function handleDelete(id: string) {
    setNotes(notes.filter((n) => n.id !== id));
    setView({ name: "home" });
  }

  /**
   * Export a note as JSON.
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

  // Find the note currently being viewed
  const currentNote =
    view.name === "view" ? notes.find((n) => n.id === view.id) : null;

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white font-inter">
      <Navbar />

      <main className="min-h-[calc(100vh-4rem)] px-8 py-12 flex justify-center items-start">
        <section className="w-full max-w-7xl bg-slate-950 rounded-xl shadow-xl p-10">

          {/* HOME SCREEN */}
          {view.name === "home" && (
            <div className="text-center">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                Quick Notes for First Responders
              </h1>

              <p className="text-lg text-white/70 mb-8">
                Capture vital info fast — timestamp, location, and tags.
              </p>

              {/* EMT Mode button */}
              <button
                onClick={() => setView({ name: "emt" })}
                className="bg-brand-500 hover:bg-brand-600 text-white px-6 py-3 rounded-lg text-lg mb-10"
              >
                EMT Mode
              </button>

              {notes.length === 0 ? (
                <div className="text-white/50">No recent notes</div>
              ) : (
                <div className="grid gap-4">
                  {notes.map((n) => (
                    <div
                      key={n.id}
                      onClick={() => setView({ name: "view", id: n.id })}
                      className="bg-slate-800 p-4 rounded-lg cursor-pointer hover:bg-slate-700 transition"
                    >
                      <h2 className="text-xl font-semibold">{n.title}</h2>
                      <p className="text-white/70 text-sm">{n.timestamp}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* EMT DASHBOARD */}
          {view.name === "emt" && (
            <EMTDashboard
              onStart={() => setView({ name: "emt-incident" })}
              onContinue={() =>
                setView({ name: "view", id: notes[0]?.id || "" })
              }
              onView={() => setView({ name: "home" })}
            />
          )}

          {/* EMT INCIDENT SCREEN */}
          {view.name === "emt-incident" && (
  <EMTIncident
    onSave={(data) => {
      console.log("Incident saved:", data);
      setView({ name: "emt" });
    }}
    onCancel={() => setView({ name: "emt" })} // ← This already acts as a back button
  />
)}


          {/* NEW NOTE */}
          {view.name === "new" && (
            <NewNote
              onSave={handleSave}
              onCancel={() => setView({ name: "home" })}
            />
          )}

          {/* VIEW NOTE */}
          {view.name === "view" && currentNote && (
            <ViewNote
              note={currentNote}
              onEdit={() => setView({ name: "new" })}
              onDelete={() => handleDelete(currentNote.id)}
              onExport={() => handleExport(currentNote)}
            />
          )}

        </section>
      </main>
    </div>
  );
}

export default App;