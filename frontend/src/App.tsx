/**
 * App.tsx
 * -------
 * Main controller for the entire application.
 *
 * Responsibilities:
 * - Navigation between screens
 * - Saving notes
 * - Saving EMT incidents
 * - Editing existing incidents
 * - Viewing incident history
 * - Rendering Home, Settings, EMT, and Note screens
 */

import { useState } from "react";
import { useEffect } from "react";;
import "./App.css";

// Components
import Navbar from "./components/Navbar";

// Pages
import Home from "./pages/Home";
import Settings from "./pages/Settings";

// Note Screens
import NewNote from "./pages/NewNote";
import ViewNote from "./pages/ViewNote";

// EMT Screens
import EMTDashboard from "./pages/EMTDashboard";
import EMTIncident from "./pages/EMTIncident";
import EMTIncidentHistory from "./pages/EMTIncidentHistory";
import EMTIncidentView from "./pages/EMTIncidentView";

// Hooks
import useLocalNotes from "./hooks/useLocalNotes";
import useLocalIncidents from "./hooks/useLocalIncidents";

// Types
import type { Note } from "./types/Note";
import type { EMTIncidentData } from "./pages/EMTIncident";

/**
 * ViewState controls which screen is visible.
 */
export type ViewState =
  | { name: "home" }
  | { name: "new" }
  | { name: "view"; id: string }
  | { name: "emt" }
  | { name: "emt-incident" }
  | { name: "emt-edit"; index: number }
  | { name: "emt-history" }
  | { name: "emt-view"; index: number }
  | { name: "settings" };

function App() {
  const [view, setView] = useState<ViewState>({ name: "home" });

  // Notes storage
  const { notes, setNotes } = useLocalNotes();

  // EMT incidents storage
  const { incidents, setIncidents } = useLocalIncidents();
   
  // Apply saved theme on load
  useEffect(() => {
  const savedTheme = localStorage.getItem("settings_themeMode");

  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark");
  } else {
    document.documentElement.classList.remove("dark");
  }
}, [view]);

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

  /**
   * Save or update an EMT incident.
   */
  function handleSaveIncident(data: EMTIncidentData, editIndex?: number) {
    if (editIndex !== undefined) {
      const updated = [...incidents];
      updated[editIndex] = data;
      setIncidents(updated);
    } else {
      setIncidents([data, ...incidents]);
    }

    setView({ name: "emt" });
  }

  // Current note being viewed
  const currentNote =
    view.name === "view" ? notes.find((n) => n.id === view.id) : null;

  return (
    <div
  className="
    min-h-screen w-screen font-inter
    bg-white text-black
    dark:bg-slate-900 dark:text-white
    transition-colors duration-300"
><Navbar />

      <main className="min-h-[calc(100vh-4rem)] px-8 py-12 flex justify-center items-start">
        <section
  className="
    w-full max-w-7xl rounded-xl shadow-xl p-10
    bg-slate-100 text-black
    dark:bg-slate-900 dark:text-white
    transition-colors duration-300
  "
>

          {/* HOME */}
          {view.name === "home" && (
            <Home setView={setView} notes={notes} />
          )}

          {/* SETTINGS */}
          {view.name === "settings" && (
            <Settings onBack={() => setView({ name: "home" })} />
          )}

          {/* EMT DASHBOARD */}
          {view.name === "emt" && (
            <EMTDashboard
              onStart={() => setView({ name: "emt-incident" })}
              onContinue={() =>
                incidents.length > 0
                  ? setView({ name: "emt-edit", index: 0 })
                  : null
              }
              onView={() => setView({ name: "emt-history" })}
              onHome={() => setView({ name: "home" })}
            />
          )}

          {/* NEW EMT INCIDENT */}
          {view.name === "emt-incident" && (
            <EMTIncident
              onSave={handleSaveIncident}
              onCancel={() => setView({ name: "emt" })}
            />
          )}

          {/* EDIT EXISTING INCIDENT */}
          {view.name === "emt-edit" && (
            <EMTIncident
              initialData={incidents[view.index]}
              editIndex={view.index}
              onSave={handleSaveIncident}
              onCancel={() => setView({ name: "emt" })}
            />
          )}

          {/* INCIDENT HISTORY */}
          {view.name === "emt-history" && (
            <EMTIncidentHistory
              incidents={incidents}
              onSelect={(_, index) =>
                setView({ name: "emt-view", index })
              }
              onBack={() => setView({ name: "emt" })}
            />
          )}

          {/* VIEW INCIDENT */}
          {view.name === "emt-view" && (
            <EMTIncidentView
              incident={incidents[view.index]}
              onBack={() => setView({ name: "emt-history" })}
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