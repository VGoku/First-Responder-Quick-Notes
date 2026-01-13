/**
 * Home.tsx
 * --------
 * The main landing screen for the app.
 *
 * This component:
 * - Shows EMT Mode button
 * - Shows Settings button
 * - Shows recent notes
 * - Uses setView() to navigate between screens
 *
 * It receives:
 * - setView: navigation function from App.tsx
 * - notes: list of saved notes
 */

import type { Note } from "../types/Note";
import type { ViewState } from "../App";

type HomeProps = {
  setView: (nextView: ViewState) => void;
  notes: Note[];
};

export default function Home({ setView, notes }: HomeProps) {
  return (
    <div className="text-center">

      <h1 className="text-4xl font-bold tracking-tight mb-2 dark:text-black">
        Quick Notes for First Responders
      </h1>

      <p className="text-lg text-white/70 dark:text-black/70 mb-8">
        Capture vital info fast — timestamp, location, and tags.
      </p>

      {/* EMT Mode */}
      <button
        onClick={() => setView({ name: "emt" })}
        className="
          px-6 py-3 rounded-lg text-lg mb-6
          bg-brand-500 hover:bg-brand-600 text-white
          dark:bg-blue-500 dark:hover:bg-blue-600 dark:text-black
        "
      >
        EMT Mode
      </button>

      {/* Settings */}
      <button
        onClick={() => setView({ name: "settings" })}
        className="
          px-6 py-3 rounded-lg text-lg mb-10 ml-4
          bg-slate-700 hover:bg-slate-600 text-white
          dark:bg-slate-300 dark:hover:bg-slate-200 dark:text-black
        "
      >
        Settings
      </button>

      {/* Notes List */}
      {notes.length === 0 ? (
        <div className="text-white/50 dark:text-black/50">No recent notes</div>
      ) : (
        <div className="grid gap-4">
          {notes.map((n) => (
            <div
              key={n.id}
              onClick={() => setView({ name: "view", id: n.id })}
              className="
                p-4 rounded-lg cursor-pointer transition
                bg-slate-800 hover:bg-slate-700 text-white
                dark:bg-slate-200 dark:hover:bg-slate-300 dark:text-black
              "
            >
              <h2 className="text-xl font-semibold">{n.title}</h2>
              <p className="text-white/70 dark:text-black/70 text-sm">
                {n.timestamp}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}